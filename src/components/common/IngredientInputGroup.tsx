import { useState, useEffect } from 'react';
import DropDownWithSearch from './DropDownWithSearch';
import { Ingredient, Option } from '../../utils/types';

const liquidsDB = [{ id: 1, liquid: "tequila" }, { id: 2, liquid: "whiskey" }, { id: 3, liquid: "gin" }, { id: 4, liquid: "rum" }]
const quantityAmountsDB = [{ id: 3, amount: "1 / 3" }, { id: 4, amount: '4' }]
const quantityUnitsDB = [{ id: 5, unit: "oz" }]

type IngredientInputGroup = {
  handleUpdate: (newIngredient: Ingredient, index: number) => void;
  ingredient: Ingredient;
  index: number;
}

/** Renders Combobox and processes data for new Ingredient
 * 
 * IngredientGroup -> IngredientInputGroup -> DropDownWithSearch
*/
function IngredientInputGroup({ handleUpdate, ingredient, index }: IngredientInputGroup) {
  const [liquid, setLiquid] = useState<Option>({ id: null, liquid: "" });
  const [amount, setAmount] = useState<Option>({ id: null, amount: "" });
  const [unit, setUnit] = useState<Option>({ id: null, unit: "" });

  const [liquids, setLiquids] = useState(liquidsDB)
  const [quantityAmount, setQuantityAmounts] = useState(quantityAmountsDB)
  const [quantityUnits, setQuantityUnits] = useState(quantityUnitsDB)


  /** Calls parent callback to handleUpdate ingredient */
  function updateIngredientList() {
    const updatedIngredient = { ...ingredient, liquid, amount, unit };
    handleUpdate(updatedIngredient, index)
  }

  /** Handles changes made to state */
  function updateState(state: string, option: Option) {
    if (state === "liquid") setLiquid(option)
    if (state === "unit") setLiquid(option)
    if (state === "amount") setLiquid(option)
  }

  useEffect(() => {
    updateIngredientList()
  }, [liquid, amount, unit])

  return (
    <div className="flex rounded-md my-2 border-2">
      <DropDownWithSearch handleAdd={updateState} updateOptions={setQuantityAmounts} options={quantityAmount} name={"amount"} />
      <DropDownWithSearch handleAdd={updateState} updateOptions={setQuantityUnits} options={quantityUnits} name={"unit"} />
      <DropDownWithSearch handleAdd={updateState} updateOptions={setLiquids} options={liquids} name={"liquid"} />
    </div>
  )
}

export default IngredientInputGroup;