import { useEffect, useContext, useRef } from "react";
import IngredientInputGroup from "../selectors/IngredientInputGroup";
import { ComponentsOptionsRequestsProps } from "../../utils/props";
import API from "../../api";
import { UserContext } from "../../context/UserContext";
import { AttributeData } from "../../utils/types";
import { errorHandling } from "../../utils/ErrorHandling";
import { scrollIntoViewElement } from "../../utils/functions";
import { DataContext } from "../../context/DataContext";

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
  const { setIngredientOptions, ingredientOptions } = useContext(DataContext);
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

  /** Handles list of available options - adds newly created to parent state*/
  async function updateAvailableOptions(state: string, option: AttributeData) {
    if (state === "item")
      setIngredientOptions({
        ...ingredientOptions,
        items: [...ingredientOptions.items, option],
      });
    if (state === "unit")
      setIngredientOptions({
        ...ingredientOptions,
        units: [...ingredientOptions.units, option],
      });
    if (state === "amount")
      setIngredientOptions({
        ...ingredientOptions,
        amounts: [...ingredientOptions.amounts, option],
      });
  }

  const optionAction = {
    post: addOption,
    addCreated: updateAvailableOptions,
    associate: associateOptionToBook,
  };

  /** Automatically associates "global user" option to current book on select*/
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

  return (
    <>
      <div className="flex-1 min-h-0 py-2 px-1 overflow-y-auto rounded-md border-2 border-accent-secondary">
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
              length={ingredients.length - 1}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default ComponentsOptionsRequests;
