import { useState } from 'react';
import DropDownWithSearch from './DropDownWithSearch';

const liquidsDB = [{ id: 1, name: "tequila" }, { id: 1, name: "whiskey"}]
const quantityAmountsDB = [{ id: 1, name: "1 / 3" },  { id: 1, name: '4'}]
const quantityUnitsDB = [{ id: 1, name: "oz"}]

type Ingredient = {
  id?: number;
  name: string;
  quantityAmount: number;
  quantityUnit: number;
}

const defaultIngredient: Ingredient = { name: "", quantityAmount: 0, quantityUnit: 0 }

/** Renders Comboboxes and processes data for newIngredient
 * 
 * Modal -> InputGroup
*/
function InputGroup() {
  const [newIngredient, setNewIngredient] = useState<Ingredient>(defaultIngredient);
  const [liquids, setLiquids] = useState(liquidsDB)
  const [quantityAmount, setQuantityAmounts] = useState(quantityAmountsDB)
  const [quantityUnits, setQuantityUnits] = useState(quantityUnitsDB)

  /** Handles changes to newIngredient */
  function handleChange(event: any) {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name, value)
    setNewIngredient(i => (
      { ...i, [name]: value }
    ))
  }

  return (
    <div className="flex rounded-md border-2">
      <DropDownWithSearch handleChange={handleChange} options={quantityAmount} name={"quantityAmount"} />
      <DropDownWithSearch handleChange={handleChange} options={quantityUnits} name={"quantityUnit"} />
      <DropDownWithSearch handleChange={handleChange} options={liquids} name={"name"} />
    </div>
  )
}

export default InputGroup;
