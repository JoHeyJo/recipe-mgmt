import { useState } from 'react';
import DropDownWithSearch from './DropDownWithSearch';

type Ingredient = {
  id?: number;
  name: string;
  quantityAmount: number;
  quantityUnit: number;
}

const defaultIngredient: Ingredient = { name: "", quantityAmount: 0, quantityUnit: 0 }

/** Renders Comboboxes and processes data for ingredient
 * 
 * Modal -> InputGroup
*/
function InputGroup() {
  const [ingredient, setIngredient] = useState<Ingredient>(defaultIngredient);

  /** Handles changes to ingredient */
  function handleChange(event: any) {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name,value)
    setIngredient(i => (
      { ...i, [name]: value }
    ))
  }

  return (
    <div className="flex rounded-md border-2">
      <DropDownWithSearch handleChange={handleChange} opt={defaultIngredient.name}/>
      <DropDownWithSearch handleChange={handleChange} opt={defaultIngredient.quantityUnit}/>
      <DropDownWithSearch handleChange={handleChange} opt={defaultIngredient.quantityAmount}/>
    </div>
  )
}

export default InputGroup;
