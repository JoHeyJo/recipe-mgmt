import { useState, useEffect, useContext } from 'react';
import { RecipeContext } from '../../context/RecipeContext';
import OptionRequests from '../requests/OptionRequests';
import { Ingredient, Option } from '../../utils/types';
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
  const [item, setItem] = useState<Option>(ingredient.item);
  const [amount, setAmount] = useState<Option>(ingredient.amount);
  const [unit, setUnit] = useState<Option>(ingredient.unit);

  const [items, setItems] = useState<Option[]>([])
  const [quantityAmount, setQuantityAmounts] = useState<Option[]>([])
  const [quantityUnits, setQuantityUnits] = useState<Option[]>([])

  /** Calls parent callback to handleUpdate name */
  function updateIngredientList() {
    const updatedIngredient = { ...ingredient, item, amount, unit };
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
      <OptionRequests value={ingredient.amount} handleOptions={handleOptions} handleOptionChange={updateState} options={quantityAmount} name={"value"} />
      <OptionRequests value={ingredient.unit} handleOptions={handleOptions} handleOptionChange={updateState} options={quantityUnits} name={"type"} />
      <OptionRequests value={ingredient.item} handleOptions={handleOptions} handleOptionChange={updateState} options={items} name={"name"} />
    </div>
  )
}

export default IngredientInputGroup;