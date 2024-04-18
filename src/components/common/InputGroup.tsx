import { useState } from 'react';
import DropDownWithSearch from './DropDownWithSearch';

type Ingredient = {
  id?: number;
  name: string | undefined;
  quantityAmount: number | undefined;
  quantityUnit: number | undefined;

}

const defaultIngredient: Ingredient = { name: undefined, quantityAmount: undefined, quantityUnit: undefined }

/** Renders Comboboxes and processes data for ingredient
 * 
 * Modal -> InputGroup
*/
function InputGroup() {
  const [ingredient, setIngredient] = useState<Ingredient | null>(defaultIngredient);
  return (
    <div className="flex rounded-md border-2">
      <DropDownWithSearch />
      <DropDownWithSearch />
      <DropDownWithSearch />
    </div>
  )
}

export default InputGroup;
