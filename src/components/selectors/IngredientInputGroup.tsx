import { useState, useEffect } from 'react';
import OptionRequests from '../requests/OptionRequests';
import { AttributeData } from '../../utils/types';
import API from '../../api';
import { IngredientInputGroupProps } from '../../utils/props';

const defaultItem = { id: null, name: "" };
const defaultAmount = { id: null, value: "" };
const defaultUnit = { id: null, type: "" };

/** Renders Combobox and processes data for new Ingredient
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

  /** Calls parent callback to handleUpdate name */
  function updateIngredientList() {
    const updatedIngredient = { ...ingredient, item, amount, unit };
    handleUpdate(updatedIngredient, index)
  }

  /** Handles changes made to option state */
  function updateState(state: string, option: AttributeData) {
    if (state === "item") setItem(option)
    if (state === "unit") setUnit(option)
    if (state === "amount") setAmount(option)
  }

  /** Handles adding options to state */
  function addOption(state: string, option: AttributeData) {
    if (state === "item") setItems((options: AttributeData[]) => [...options, option])
    if (state === "unit") setQuantityUnits((options: AttributeData[]) => [...options, option])
    if (state === "amount") setQuantityAmounts((options: AttributeData[]) => [...options, option])
  }

  /** Removes deselected option */
  function removeDeselected(state: string) {
    if (state === "item") setItem(defaultItem);
    if (state === "unit") setUnit(defaultUnit);
    if (state === "amount") setAmount(defaultAmount);
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
      const amounts = await API.getIngredients("amounts")
      const units = await API.getIngredients("units")
      const items = await API.getIngredients("items")
      setItems(items);
      setQuantityUnits(units);
      setQuantityAmounts(amounts);
    }
    fetchOptions()
  }, [])

  return (
    <div className="flex rounded-md">
      <OptionRequests value={ingredient.amount} handleOptions={handleOptions} handleOptionChange={updateState} options={quantityAmount} attribute={"value"} entity={"amount"} />
      <OptionRequests value={ingredient.unit} handleOptions={handleOptions} handleOptionChange={updateState} options={quantityUnits} attribute={"type"} entity={"unit"} />
      <OptionRequests value={ingredient.item} handleOptions={handleOptions} handleOptionChange={updateState} options={items} attribute={"name"} entity={"item"} />
    </div>
  )
}

export default IngredientInputGroup;