import { useState, ChangeEvent, useEffect, useContext } from "react";
import RadioSwitch from "../ui/common/RadioSwitch";
import IngredientInputGroup from "../selectors/IngredientInputGroup";
import { ComponentsOptionsRequestsProps } from "../../utils/props";
import FaPlusButton from '../ui/common/FaPlusButton';
import FaMinusButton from '../ui/common/FaMinusButton';
import API from "../../api";
import { UserContext } from '../../context/UserContext';
import { AttributeData } from "../../utils/types";
import { errorHandling } from '../../utils/ErrorHandling';
import { references } from "../../utils/templates";


/** Manages ingredient requests and dropdown options
 * 
 * IngredientsGroup -> ComponentsOptionsRequests -> IngredientInputGroup
 */
function ComponentsOptionsRequests({ ingredients, ingredientKeys, handleIngredient }: ComponentsOptionsRequestsProps) {
  const [items, setItems] = useState<AttributeData[]>([])
  const [quantityAmount, setQuantityAmounts] = useState<AttributeData[]>([])
  const [quantityUnits, setQuantityUnits] = useState<AttributeData[]>([])
  const [whichOptions, setWhichOptions] = useState<string>("book");
  const [optionsReferences, setOptionsReferences] = useState(references)

  const { userId, currentBookId } = useContext(UserContext);

  /** handle state change for whichIngredients */
  function handleRadio(event: ChangeEvent<HTMLInputElement>) {
    setWhichOptions(event.target.value)
  }

  /** Request to create new ingredient option */
  async function postOption(entity: string, attributeObject: AttributeData): Promise<AttributeData> {
    try {
      const id = await API.postComponentOption(attributeObject, currentBookId, userId, entity);
      return id;
    } catch (error: any) {
      errorHandling("ComponentsOptionsRequests - addOption", error)
      throw error
    }
  }

  /** Handles list of available options - adds newly created */
  async function updateAvailableOptions(state: string, option: AttributeData) {
    if (state === "item") setItems((options: AttributeData[]) => [...options, option])
    if (state === "unit") setQuantityUnits((options: AttributeData[]) => [...options, option])
    if (state === "amount") setQuantityAmounts((options: AttributeData[]) => [...options, option])
  }

  const handleOption = {
    post: postOption,
    addCreated: updateAvailableOptions,
    associate: associateOptionToBook
  }

  const options = {
    items,
    amounts: quantityAmount,
    units: quantityUnits,
    selected: whichOptions,
    references: optionsReferences
  }

  /** Fetches components options associated to Book  */
  async function fetchBookComponentsOptions() {
    const { amounts, units, items } = await API.getBookComponentsOptions(userId, currentBookId)
    setOptionsReferences({ "amount": amounts, "unit": units, "item": items }) ///DOES THIS NEED TO BE MEMOIZED
    setItems(items);
    setQuantityUnits(units);
    setQuantityAmounts(amounts);
  }
  /** Fetches components options associated to User  */
  async function fetchUserComponentsOptions() {
    const { amounts, units, items } = await API.getUserComponentsOptions(userId);
    setItems(items);
    setQuantityUnits(units);
    setQuantityAmounts(amounts);
  }

  /** Automatically associates "global user" option to current book on select - could this be better on switch?*/
  async function associateOptionToBook(userId: number, currentBookId: number, optionId: number, component: string) {
    try {
      const res = await API.postOptionAssociation(userId, currentBookId, optionId, component)
    } catch (error: any) {
      errorHandling("ComponentsOptionsRequests - associateOptionToBook", error)
      throw error
    }
  }

  /** Populate each instance of component with the most current options */
  useEffect(() => {
    whichOptions == "book" ? fetchBookComponentsOptions() : fetchUserComponentsOptions()
  }, [whichOptions])

  return (
    <>
      <RadioSwitch handleSwitch={handleRadio} selection={whichOptions} />
      {ingredients.map((ingredient, i) =>
        <div key={ingredient.ingredient_id || ingredientKeys[i]} className='flex items-center justify-center'>
          <IngredientInputGroup index={i} ingredient={ingredient} handleIngredient={handleIngredient} handleOption={handleOption} options={options} />
          {i === ingredients.length - 1 ? <FaPlusButton onAction={handleIngredient.add} /> : <FaMinusButton onAction={() => handleIngredient.remove(i)} />}
        </div>
      )}
    </>
  )
}

export default ComponentsOptionsRequests;