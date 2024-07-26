import { useState } from 'react';
import DropDownWithSearch from './DropDownWithSearch';
import { Ingredient } from '../../utils/types';

const liquidsDB = [{ id: 1, liquid: "tequila" }, { id: 2, liquid: "whiskey"}]
const quantityAmountsDB = [{ id: 3, amount: "1 / 3" },  { id: 4, amount: '4'}]
const quantityUnitsDB = [{ id: 5, unit: "oz"}]

/** Renders Combobox and processes data for new Ingredient
 * 
 * IngredientGroup -> IngredientInputGroup -> DropDownWithSearch
*/
function IngredientInputGroup({update, ingredient}: any) {
  const [liquid, setLiquid] = useState({ id: null, liquid: "" });
  const [amount, setAmount] = useState({ id: null, amount: "" });
  const [unit, setUnit] = useState({ id: null, unit: "" });

  const [liquids, setLiquids] = useState(liquidsDB)
  const [quantityAmount, setQuantityAmounts] = useState(quantityAmountsDB)
  const [quantityUnits, setQuantityUnits] = useState(quantityUnitsDB)

  /** Handles changes to newIngredient */
  function addIngredient(ingredient: Ingredient, name:string) {
    // setIngredient((i)=> (
    //   {...i, [name]: ingredient}
    // ))
    // update(ingredient)
  }

  /** Calls parent callback to update ingredient */
  function updateIngredient(ingredient: Ingredient, name: string){
    console.log(ingredient)
  }

  return (
    <div className="flex rounded-md border-2">
      <DropDownWithSearch addIngredient={updateIngredient} options={quantityAmount} name={"amount"} />
      <DropDownWithSearch addIngredient={updateIngredient} options={quantityUnits} name={"unit"} />
      <DropDownWithSearch addIngredient={updateIngredient} options={liquids} name={"liquid"} />
    </div>
  )
}

export default IngredientInputGroup;