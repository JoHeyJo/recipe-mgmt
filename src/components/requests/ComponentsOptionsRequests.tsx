import { useState, ChangeEvent, useEffect, useContext, useRef } from "react";
import RadioSwitch from "../ui/common/RadioSwitch";
import IngredientInputGroup from "../selectors/IngredientInputGroup";
import { ComponentsOptionsRequestsProps } from "../../utils/props";
import API from "../../api";
import { UserContext } from "../../context/UserContext";
import { AttributeData } from "../../utils/types";
import { errorHandling } from "../../utils/ErrorHandling";
import { references } from "../../utils/templates";
import { scrollIntoViewElement } from "../../utils/functions";
import useDataRequest from "../../hooks/useDataRequest";

/** Manages ingredient requests and dropdown options
 *
 * IngredientsGroup -> ComponentsOptionsRequests -> IngredientInputGroup
 */
function ComponentsOptionsRequests({
  numOfIngredients,
  ingredients,
  ingredientKeys,
  ingredientAction,
}: ComponentsOptionsRequestsProps) {
  const [items, setItems] = useState<AttributeData[]>([]);
  const [quantityAmount, setQuantityAmounts] = useState<AttributeData[]>([]);
  const [quantityUnits, setQuantityUnits] = useState<AttributeData[]>([]);
  const [optionsReferences, setOptionsReferences] = useState(references);
  const { data, isBookSource } = useDataRequest();

  const ingredientSectionRef = useRef<HTMLDivElement>();

  const { userId, currentBookId } = useContext(UserContext);

  /** Request to create new ingredient option */
  async function addOption(
    entity: string,
    attributeObject: AttributeData,
  ): Promise<AttributeData> {
    try {
      const id = await API.postIngredientOption(
        attributeObject,
        currentBookId,
        userId,
        entity,
      );
      return id;
    } catch (error: any) {
      errorHandling("ComponentsOptionsRequests - addOption", error);
      throw error;
    }
  }

  /** Handles list of available options - adds newly created */
  async function updateAvailableOptions(state: string, option: AttributeData) {
    if (state === "item")
      setItems((options: AttributeData[]) => [...options, option]);
    if (state === "unit")
      setQuantityUnits((options: AttributeData[]) => [...options, option]);
    if (state === "amount")
      setQuantityAmounts((options: AttributeData[]) => [...options, option]);
  }

  const optionAction = {
    post: addOption,
    addCreated: updateAvailableOptions,
    associate: associateOptionToBook,
  };

  const options = {
    items,
    amounts: quantityAmount,
    units: quantityUnits,
    isBookSource,
    references: optionsReferences,
  };

  /** Automatically associates "global user" option to current book on select - could this be better on switch?*/
  async function associateOptionToBook(
    userId: number,
    currentBookId: number,
    optionId: number,
    component: string,
  ) {
    try {
      const res = await API.postOptionAssociation(
        userId,
        currentBookId,
        optionId,
        component,
      );
    } catch (error: any) {
      errorHandling("ComponentsOptionsRequests - associateOptionToBook", error);
      throw error;
    }
  }

  // Scrolls into view newly created ingredient
  useEffect(() => {
    if (numOfIngredients > 3) scrollIntoViewElement(ingredientSectionRef);
  }, [numOfIngredients]);

  useEffect(() => {
    console.log("data in copr:",data)
    const { items, units, amounts } = data.ingredients;
    if (isBookSource) {
      setOptionsReferences({ amount: amounts, unit: units, item: items }); ///DOES THIS NEED TO BE MEMOIZED
    }
    setItems(items);
    setQuantityUnits(units);
    setQuantityAmounts(amounts);
  }, [isBookSource]);

  return (
    <>
      <div className="py-2 px-1 h-full overflow-y-auto rounded-md border-2 border-accent-secondary">
        {ingredients.map((ingredient, i) => (
          <div
            ref={ingredientSectionRef}
            // These keys are not unique using i for the time being
            // key={ingredient.ingredient_id || ingredientKeys[i]}
            key={i}
            className="ComponentsOptionsRequests-Ingredients-section flex items-center justify-center"
          >
            <IngredientInputGroup
              index={i}
              ingredient={ingredient}
              onIngredientAction={ingredientAction}
              optionAction={optionAction}
              options={options}
              length={ingredients.length - 1}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default ComponentsOptionsRequests;
