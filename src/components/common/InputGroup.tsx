import { useState } from 'react';
import DropDownWithSearch from './DropDownWithSearch';

const spirits: { id: number, name: string }[] = [
  { id: 1, name: '3/4' },
  { id: 2, name: '1' },
  { id: 3, name: '2' },
]


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
    console.log(name, value)
    setIngredient(i => (
      { ...i, [name]: value }
    ))
  }

  return (
    <div className="flex rounded-md border-2">
      <DropDownWithSearch handleChange={handleChange} options={options} name={"quantityAmount"}/>
      <DropDownWithSearch handleChange={handleChange} options={options} name={"quantityUnit"}/>
      <DropDownWithSearch handleChange={handleChange} options={options} name={"name"}/>
    </div>
  )
}

export default InputGroup;
