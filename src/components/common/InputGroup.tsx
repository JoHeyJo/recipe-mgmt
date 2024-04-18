import { useState } from 'react';
import DropDownWithSearch from './DropDownWithSearch';

type Ingredient = {
  id?: number;
  name: string | undefined;
  quantityAmount: number | undefined;
  quantityUnit: number | undefined;

}

const defaultIngredient: Ingredient = { name: "", quantityAmount: undefined, quantityUnit: undefined }

/** Renders Comboboxes and processes data for ingredient
 * 
 * Modal -> InputGroup
*/
function InputGroup() {
  const [ingredient, setIngredient] = useState<Ingredient | null>(defaultIngredient);

  /** Handles changes to ingredient */
  function handleChange(event: any) {
    const { name, value } = event.target.name;
    setIngredient((i) => (
      { ...i, [name]: value }
    ))
  }

  return (
    <div className="flex rounded-md border-2">
      <DropDownWithSearch handleChange={handleChange} option={name}/>
      <DropDownWithSearch handleChange={handleChange} option={name}/>
      <DropDownWithSearch handleChange={handleChange} option={name}/>
    </div>
  )
}

export default InputGroup;
