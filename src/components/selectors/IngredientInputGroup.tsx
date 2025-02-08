import { useState, useEffect, useContext } from 'react';
import OptionRequests from '../requests/OptionRequests';
import { AttributeData, Ingredients } from '../../utils/types';
import API from '../../api';
import { IngredientInputGroupProps } from '../../utils/props';
import { UserContext } from '../../context/UserContext';
import FaPlusButton from '../ui/common/FaPlusButton';
import FaMinusButton from '../ui/common/FaMinusButton';

const defaultItem = { id: null, name: "" };
const defaultAmount = { id: null, value: "" };
const defaultUnit = { id: null, type: "" };

/** Creates individual Ingredient object - requests ingredients from db
 * 
 * Can be split into two components
 * 
 * IngredientGroup -> IngredientInputGroup -> OptionRequests
*/
function IngredientInputGroup({ handleUpdate, ingredient, index }: IngredientInputGroupProps) {
  const [item, setItem] = useState<AttributeData>(ingredient.item);
  const [amount, setAmount] = useState<AttributeData>(ingredient.amount);
  const [unit, setUnit] = useState<AttributeData>(ingredient.unit);

  const [items, setItems] = useState<AttributeData[]>([])
  const [quantityAmount, setQuantityAmounts] = useState<AttributeData[]>([])
  const [quantityUnits, setQuantityUnits] = useState<AttributeData[]>([])

  const [whichIngredients, setWhichIngredients] = useState<string>("book")

  const { userId, currentBookId } = useContext(UserContext);


  /** Calls parent callback to handleUpdate name */
  function updateIngredientList() {
    const updatedIngredient = { ...ingredient, item, amount, unit };
    handleUpdate(updatedIngredient, index)
  }

  /** Handles changes made to option state */
  function updateState(state: string, option: AttributeData) {
    if (state === "name") setItem(option)
    if (state === "type") setUnit(option)
    if (state === "value") setAmount(option)
  }

  /** Handles adding options to state */
  function addOption(state: string, option: AttributeData) {
    if (state === "name") setItems((options: AttributeData[]) => [...options, option])
    if (state === "type") setQuantityUnits((options: AttributeData[]) => [...options, option])
    if (state === "value") setQuantityAmounts((options: AttributeData[]) => [...options, option])
  }

  /** Removes deselected option */
  function removeDeselected(state: string) {
    if (state === "name") setItem(defaultItem);
    if (state === "type") setUnit(defaultUnit);
    if (state === "value") setAmount(defaultAmount);
  }

  const handleOptions = {
    removeDeselected,
    addOption
  }

  /** Maintains parent components state synced with latest selections */
  useEffect(() => {
    updateIngredientList()
  }, [item, amount, unit])

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
    <div className="flex rounded-md">
      <OptionRequests value={ingredient.amount} handleOptions={handleOptions} handleOptionChange={updateState} options={quantityAmount} attribute={"value"} entity={"amount"} />
      <OptionRequests value={ingredient.unit} handleOptions={handleOptions} handleOptionChange={updateState} options={quantityUnits} attribute={"type"} entity={"unit"} />
      <OptionRequests value={ingredient.item} handleOptions={handleOptions} handleOptionChange={updateState} options={items} attribute={"name"} entity={"item"} />
    </div>
      {/* {i === ingredients.length - 1 ? <FaPlusButton onAction={addIngredient} /> : <FaMinusButton onAction={() => removeIngredient(i)} />} */}

    </>
  )
}

export default IngredientInputGroup;