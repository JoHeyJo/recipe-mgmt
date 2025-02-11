import { useState, useEffect } from 'react';
import { AttributeData } from '../../utils/types';
import { IngredientInputGroupProps } from '../../utils/props';
import IngredientManager from '../views/IngredientManager';

const defaultItem = { id: null, name: "" };
const defaultAmount = { id: null, value: "" };
const defaultUnit = { id: null, type: "" };

/** Manages individual components of Ingredient object
 * 
 * IngredientRequests -> IngredientInputGroup -> IngredientManager
*/
function IngredientInputGroup({ handleIngredient, ingredient, index, handleOption, options }: IngredientInputGroupProps) {
  const [item, setItem] = useState<AttributeData>(ingredient.item);
  const [amount, setAmount] = useState<AttributeData>(ingredient.amount);
  const [unit, setUnit] = useState<AttributeData>(ingredient.unit);

  /** Calls parent callback to handleUpdate name */
  function updateIngredientList() {
    const updatedIngredient = { ...ingredient, item, amount, unit };
    handleIngredient.update(updatedIngredient, index)
  }

  /** Changes selected attribute */
  function updateSelected(state: string, option: AttributeData) {
    console.log("!!!!",state, option)
    if (state === "item") setItem(option)
    if (state === "unit") setUnit(option)
    if (state === "amount") setAmount(option)
  }

  /** Unselects option */
  function unSelectInput(state: string) {
    if (state === "item") setItem(defaultItem);
    if (state === "unit") setUnit(defaultUnit);
    if (state === "amount") setAmount(defaultAmount);
  }

  const handleSelected = {
    update: updateSelected,
    remove: unSelectInput
  }

  /** Maintains parent components state synced with latest selections */
  useEffect(() => {
    updateIngredientList()
  }, [item, amount, unit])

  return (
    <div className="flex rounded-md">
      <IngredientManager value={ingredient.amount} attribute={"value"} entity={"amount"} options={options.amounts} handleOption={handleOption} handleSelected={handleSelected} />
      <IngredientManager value={ingredient.unit} attribute={"type"} entity={"unit"} options={options.units} handleOption={handleOption} handleSelected={handleSelected} />
      <IngredientManager value={ingredient.item} attribute={"name"} entity={"item"} options={options.items} handleOption={handleOption} handleSelected={handleSelected} />
    </div>
  )
}

export default IngredientInputGroup;