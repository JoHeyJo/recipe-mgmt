import { useState } from 'react';
import DropDownWithSearch from './DropDownWithSearch';
import { Ingredient } from '../../utils/types';

const liquidsDB = [{ id: 1, liquid: "tequila" }, { id: 2, liquid: "whiskey"}]
const quantityAmountsDB = [{ id: 3, amount: "1 / 3" },  { id: 4, amount: '4'}]
const quantityUnitsDB = [{ id: 5, unit: "oz"}]

// { name: "", quantityAmount: 0, quantityUnit: 0 }
const defaultIngredients: Ingredient[] = []

/** Renders Combobox and processes data for new Ingredient
 * 
 * Modal -> IngredientInputGroup -> DropDownWithSearch
*/
function IngredientInputGroup() {
  const [newIngredient, setNewIngredient] = useState<Ingredient[]>(defaultIngredients);
  const [liquids, setLiquids] = useState(liquidsDB)
  const [quantityAmount, setQuantityAmounts] = useState(quantityAmountsDB)
  const [quantityUnits, setQuantityUnits] = useState(quantityUnitsDB)

  /** Handles changes to newIngredient */
  function addIngredient(ingredient: any) {
    // if(ingredient){
      setNewIngredient((i) =>[ingredient])
    // }
  }

  return (
    <div className="flex rounded-md border-2">
      <DropDownWithSearch addIngredient={addIngredient} options={quantityAmount} name={"amount"} />
      <DropDownWithSearch addIngredient={addIngredient} options={quantityUnits} name={"unit"} />
      <DropDownWithSearch addIngredient={addIngredient} options={liquids} name={"liquid"} />
    </div>
  )
}

export default IngredientInputGroup;