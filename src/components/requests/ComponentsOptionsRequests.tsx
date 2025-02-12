import { useState, ChangeEvent, useEffect, useContext } from "react";
import RadioSwitch from "../ui/common/RadioSwitch";
import IngredientInputGroup from "../selectors/IngredientInputGroup";
import { IngredientRequestsProps } from "../../utils/props";
import FaPlusButton from '../ui/common/FaPlusButton';
import FaMinusButton from '../ui/common/FaMinusButton';
import API from "../../api";
import { UserContext } from '../../context/UserContext';
import { AttributeData } from "../../utils/types";
import { errorHandling } from '../../utils/ErrorHandling';

/** Manages ingredient requests and dropdown options
 * 
 * IngredientsGroup -> ComponentsOptionsRequests -> IngredientInputGroup
 */
function ComponentsOptionsRequests({ ingredients, ingredientKeys, handleIngredient }: IngredientRequestsProps) {
  const [items, setItems] = useState<AttributeData[]>([])
  const [quantityAmount, setQuantityAmounts] = useState<AttributeData[]>([])
  const [quantityUnits, setQuantityUnits] = useState<AttributeData[]>([])
  const [whichAttributes, setWhichAttributes] = useState<string>("book");

  const { userId, currentBookId } = useContext(UserContext);

  /** handle state change for whichIngredients */
  function handleRadio(event: ChangeEvent<HTMLInputElement>) {
    setWhichAttributes(event.target.value)
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

  /** Handles adding options to state */
  function setOptions(state: string, option: AttributeData) {
    if (state === "item") setItems((options: AttributeData[]) => [...options, option])
    if (state === "unit") setQuantityUnits((options: AttributeData[]) => [...options, option])
    if (state === "amount") setQuantityAmounts((options: AttributeData[]) => [...options, option])
  }

  const handleOption = {
    post: postOption,
    set: setOptions
  }

  const options = {
    items,
    amounts: quantityAmount,
    units: quantityUnits
  }

  async function fetchBookIngredients(){
    const {amounts, units, items} = await API.getBookIngredients(userId, currentBookId)
    setItems(items);
    setQuantityUnits(units);
    setQuantityAmounts(amounts);
  }

  async function fetchUserIngredients(){
    const res = await API.getUserIngredients(userId, )
  }

  /** Populate each instance of component with latest options */
  useEffect(() => {
    whichAttributes == "book" ? fetchBookIngredients() : fetchBookIngredients()
  }, [whichAttributes])

  return (
    <>
      <RadioSwitch handleSwitch={handleRadio} selection={whichAttributes} />
      {ingredients.map((ingredient, i) =>
        <div key={ingredient.ingredient_id || ingredientKeys[i]} className='flex items-center justify-center'>
          <IngredientInputGroup index={i} ingredient={ingredient} handleIngredient={handleIngredient} handleOption={handleOption} options={options}/>
          {i === ingredients.length - 1 ? <FaPlusButton onAction={handleIngredient.add} /> : <FaMinusButton onAction={() => handleIngredient.remove(i)} />}
        </div>
      )}
    </>
  )
}

export default ComponentsOptionsRequests;