import { useState, useEffect } from 'react';
import DropDownWithSearch from './DropDownWithSearch';
import { Ingredient, Option } from '../../utils/types';
import API from '../../api';

// const liquidsDB: Option[] = [{ id: 1, ingredient: "tequila" }, { id: 2, ingredient: "whiskey" }, { id: 3, ingredient: "gin" }, { id: 4, ingredient: "rum" }]
const quantityAmountsDB: Option[] = [{ id: 3, amount: "1 / 3" }, { id: 4, amount: '4' }]
const quantityUnitsDB: Option[] = [{ id: 5, unit: "oz" }]

type IngredientInputGroup = {
  handleUpdate: (newIngredient: Ingredient, index: number) => void;
  ingredientTemplate: Ingredient;
  index: number;
}

/** Renders Combobox and processes data for new Ingredient
 * 
 * IngredientGroup -> IngredientInputGroup -> DropDownWithSearch
*/
function IngredientInputGroup({ handleUpdate, ingredientTemplate, index }: IngredientInputGroup) {
  const [ingredient, setLiquid] = useState<Option>({ id: null, ingredient: "" });
  const [amount, setAmount] = useState<Option>({ id: null, amount: "" });
  const [unit, setUnit] = useState<Option>({ id: null, unit: "" });

  const [liquids, setLiquids] = useState<Option[]>([])
  const [quantityAmount, setQuantityAmounts] = useState<Option[]>(quantityAmountsDB)
  const [quantityUnits, setQuantityUnits] = useState<Option[]>(quantityUnitsDB)


  /** Calls parent callback to handleUpdate ingredient */
  function updateIngredientList() {
    const updatedIngredient = { ...ingredientTemplate, ingredient, amount, unit };
    handleUpdate(updatedIngredient, index)
  }

  /** Handles changes made to option state */
  function updateState(state: string, option: Option) {
    if (state === "ingredient") setLiquid(option)
    if (state === "unit") setUnit(option)
    if (state === "amount") setAmount(option)
  }

  /** Handles adding options to state */
  function addOptions(state: string, option: Option){
    if (state === "ingredient") setLiquids((options: Option[]) => [...options, option])
    if (state === "unit") setQuantityUnits((options: Option[]) => [...options, option])
    if (state === "amount") setQuantityAmounts((options: Option[]) => [...options, option])
  }

  useEffect(() => {
    updateIngredientList()
  }, [ingredient, amount, unit])

  useEffect(() => {
    async function fetchOptions(){
      const amounts = await API.getOptions("amount")
      const units = await API.getOptions("unit")
      const ingredients = await API.getOptions("ingredient")
      setLiquids(ingredients);
      setQuantityUnits(units);
      setQuantityAmounts(amounts);
    }
    fetchOptions()
  },[])

  return (
    <div className="flex rounded-md my-2 border-2">
      <DropDownWithSearch handleOptionChange={updateState} handleAddOption={addOptions} options={quantityAmount} name={"amount"} />
      <DropDownWithSearch handleOptionChange={updateState} handleAddOption={addOptions} options={quantityUnits} name={"unit"} />
      <DropDownWithSearch handleOptionChange={updateState} handleAddOption={addOptions} options={liquids} name={"ingredient"} />
    </div>
  )
}

export default IngredientInputGroup;