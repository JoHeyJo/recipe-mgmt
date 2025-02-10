import { useState, ChangeEvent, useEffect, useContext } from "react";
import RadioSwitch from "../ui/common/RadioSwitch";
import IngredientInputGroup from "../selectors/IngredientInputGroup";
import { IngredientRequestsProps } from "../../utils/props";
import FaPlusButton from '../ui/common/FaPlusButton';
import FaMinusButton from '../ui/common/FaMinusButton';
import API from "../../api";
import { UserContext } from '../../context/UserContext';
import { AttributeData } from "../../utils/types";

/** Manages ingredient requests and attributes
 * 
 * IngredientsGroup -> ingredientRequests -> IngredientInputGroup
 */
function IngredientRequests({ ingredients, ingredientKeys, handleIngredient }: IngredientRequestsProps) {
  const [items, setItems] = useState<AttributeData[]>([])
  const [quantityAmount, setQuantityAmounts] = useState<AttributeData[]>([])
  const [quantityUnits, setQuantityUnits] = useState<AttributeData[]>([])
  const [whichAttributes, setWhichAttributes] = useState<string>("book");

  const { userId, currentBookId } = useContext(UserContext);

  /** handle state change for whichIngredients */
  function handleRadio(event: ChangeEvent<HTMLInputElement>) {
    setWhichAttributes(event.target.value)
  }

  /** Handles adding options to state */
  function addOption(state: string, option: AttributeData) {
    if (state === "name") setItems((options: AttributeData[]) => [...options, option])
    if (state === "type") setQuantityUnits((options: AttributeData[]) => [...options, option])
    if (state === "value") setQuantityAmounts((options: AttributeData[]) => [...options, option])
  }

  /** Populate each instance of component with latest options */
  useEffect(() => {
    async function fetchOptions() {
      const amounts = await API.getBookIngredients(userId, currentBookId, "amount")
      const units = await API.getBookIngredients(userId, currentBookId, "unit")
      const items = await API.getBookIngredients(userId, currentBookId, "name")
      setItems(items);
      setQuantityUnits(units);
      setQuantityAmounts(amounts);
    }
    fetchOptions()
  }, [])

  return (
    <>
      <RadioSwitch handleSwitch={handleRadio} selection={whichAttributes} />
      {ingredients.map((ingredient, i) =>
        <div key={ingredient.ingredient_id || ingredientKeys[i]} className='flex items-center justify-center'>
          <IngredientInputGroup index={i} ingredient={ingredient} handleIngredient={handleIngredient} />
          {i === ingredients.length - 1 ? <FaPlusButton onAction={handleIngredient.add} /> : <FaMinusButton onAction={() => handleIngredient.remove(i)} />}
        </div>
      )}
    </>
  )
}

export default IngredientRequests;