import { useState, useEffect } from 'react';
import OptionDropDown from './OptionDropdown';
import { Ingredient, Option } from '../../utils/types';
import API from '../../api';

type IngredientInputGroup = {
  handleUpdate: (newIngredient: Ingredient, index: number) => void;
  ingredientTemplate: Ingredient;
  index: number;
}

/** Renders Combobox and processes data for new Ingredient
 * 
 * IngredientGroup -> IngredientInputGroup -> OptionDropDown
*/
function IngredientInputGroup({ handleUpdate, ingredientTemplate, index }: IngredientInputGroup) {
  const [item, setItem] = useState<Option>({ id: null, name: "" });
  const [amount, setAmount] = useState<Option>({ id: null, value: "" });
  const [unit, setUnit] = useState<Option>({ id: null, type: "" });

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
  function addOptions(state: string, option: Option){
    if (state === "name") setItems((options: Option[]) => [...options, option])
    if (state === "type") setQuantityUnits((options: Option[]) => [...options, option])
    if (state === "value") setQuantityAmounts((options: Option[]) => [...options, option])
  }

  /** Maintains parent components state synced with latest selections */
  useEffect(() => {
    updateIngredientList()
  }, [item, amount, unit])

  /** Populate each instance of component with latest options */
  useEffect(() => {
    async function fetchOptions(){
      const amounts = await API.getOptions("amounts")
      const units = await API.getOptions("units")
      const items = await API.getOptions("items")
      setItems(items);
      setQuantityUnits(units);
      setQuantityAmounts(amounts);
    }
    fetchOptions()
  },[])

  return (
    <div className="flex rounded-md my-2 border-2">
      <OptionDropDown handleOptionChange={updateState} handleAddOption={addOptions} options={quantityAmount} name={"value"} />
      <OptionDropDown handleOptionChange={updateState} handleAddOption={addOptions} options={quantityUnits} name={"type"} />
      <OptionDropDown handleOptionChange={updateState} handleAddOption={addOptions} options={items} name={"name"} />
    </div>
  )
}

export default IngredientInputGroup;