import { useState, useEffect } from 'react';
import OptionRequests from './OptionDropdown';
import { Ingredient, Option } from '../../utils/types';
import API from '../../api';

type IngredientInputGroup = {
  handleUpdate: (newIngredient: Ingredient, index: number) => void;
  ingredientTemplate: Ingredient;
  index: number;
}

const defaultItem = { id: null, name: "" };
const defaultAmount = { id: null, value: "" };
const defaultUnit = { id: null, type: "" };

/** Renders Combobox and processes data for new Ingredient
 * 
 * IngredientGroup -> IngredientInputGroup -> OptionRequests
*/
function IngredientInputGroup({ handleUpdate, ingredientTemplate, index }: IngredientInputGroup) {
  const [item, setItem] = useState<Option>(defaultItem);
  const [amount, setAmount] = useState<Option>(defaultAmount);
  const [unit, setUnit] = useState<Option>(defaultUnit);

  const [items, setItems] = useState<Option[]>([])
  const [quantityAmount, setQuantityAmounts] = useState<Option[]>([])
  const [quantityUnits, setQuantityUnits] = useState<Option[]>([])


  /** Calls parent callback to handleUpdate name */
  function updateIngredientList() {
    const updatedIngredient = { ...ingredientTemplate, item, amount, unit };
    handleUpdate(updatedIngredient, index)
  }

  /** Handles changes made to option state */
  function updateState(state: string, option: Option) {
    if (state === "name") setItem(option)
    if (state === "type") setUnit(option)
    if (state === "value") setAmount(option)
  }

  /** Handles adding options to state */
  function addOption(state: string, option: Option) {
    if (state === "name") setItems((options: Option[]) => [...options, option])
    if (state === "type") setQuantityUnits((options: Option[]) => [...options, option])
    if (state === "value") setQuantityAmounts((options: Option[]) => [...options, option])
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
      const amounts = await API.getOptions("amounts")
      const units = await API.getOptions("units")
      const items = await API.getOptions("items")
      setItems(items);
      setQuantityUnits(units);
      setQuantityAmounts(amounts);
    }
    fetchOptions()
  }, [])


  return (
    <div className="flex rounded-md my-2">
      <OptionRequests handleOptions={handleOptions} handleOptionChange={updateState} options={quantityAmount} name={"value"} />
      <OptionRequests handleOptions={handleOptions} handleOptionChange={updateState} options={quantityUnits} name={"type"} />
      <OptionRequests handleOptions={handleOptions} handleOptionChange={updateState} options={items} name={"name"} />
    </div>
  )
}

export default IngredientInputGroup;