import { useState, useEffect } from 'react';
import DropDownWithSearch from './DropDownWithSearch';
import { Ingredient } from '../../utils/types';

const liquidsDB = [{ id: 1, liquid: "tequila" }, { id: 2, liquid: "whiskey" }, { id: 3, liquid: "gin" }, { id: 4, liquid: "rum" }]
const quantityAmountsDB = [{ id: 3, amount: "1 / 3" }, { id: 4, amount: '4' }]
const quantityUnitsDB = [{ id: 5, unit: "oz" }]

/** Renders Combobox and processes data for new Ingredient
 * 
 * IngredientGroup -> IngredientInputGroup -> DropDownWithSearch
*/
function IngredientInputGroup({ update, ingredient, index }: any) {
  const [liquid, setLiquid] = useState({ id: null, liquid: "" });
  const [amount, setAmount] = useState({ id: null, amount: "" });
  const [unit, setUnit] = useState({ id: null, unit: "" });

  const [liquids, setLiquids] = useState(liquidsDB)
  const [quantityAmount, setQuantityAmounts] = useState(quantityAmountsDB)
  const [quantityUnits, setQuantityUnits] = useState(quantityUnitsDB)


  /** Calls parent callback to update ingredient */
  function updateIngredientList() {
    const updatedIngredient = { ...ingredient, liquid, amount, unit };
    update(updatedIngredient, index)
  }

  useEffect(() => {
    updateIngredientList()
  }, [liquid, amount, unit])

  return (
    <div className="flex rounded-md my-2 border-2">
      <DropDownWithSearch addIngredient={setAmount} updateOptions={setQuantityAmounts} options={quantityAmount} name={"amount"} />
      <DropDownWithSearch addIngredient={setUnit} updateOptions={setQuantityUnits} options={quantityUnits} name={"unit"} />
      <DropDownWithSearch addIngredient={setLiquid} updateOptions={setLiquids} options={liquids} name={"liquid"} />
    </div>
  )
}

export default IngredientInputGroup;