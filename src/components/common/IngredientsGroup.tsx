import { useState } from 'react';
import IngredientInputGroup from './IngredientInputGroup';
import { Ingredient } from '../../utils/types';
import { PillButton } from './PillButton';
import { PlusIcon } from '@heroicons/react/20/solid'


const defaultIngredient: Ingredient = {
  liquid: { id: null, liquid: "" },
  amount: { id: null, amount: "" },
  unit: { id: null, unit: "" }
}


/** Contains a list of ingredients 
 * 
 * 
 * AddRecipe -> IngredientsGroup -> IngredientInputGroup
 */
function IngredientsGroup() {
  const [ingredients, setIngredients] = useState<any[]>([defaultIngredient]);

  function addIngredient() {
    setIngredients(i => [...i, defaultIngredient])
  }

  function updateIngredients(newIngredient: any, index: number) {
    setIngredients((prevIngredients) =>  {
      const newIngredients = [...prevIngredients];
      newIngredients[index] = newIngredient
     return newIngredients
    })
  }

  return (
    <>
      <button
        onClick={addIngredient}
        type="button"
        className="rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <PlusIcon aria-hidden="true" className="h-5 w-5" />
      </button>
      {ingredients.map((ingredient, i) =>
        <IngredientInputGroup key={i} index={i} ingredient={ingredient} update={updateIngredients} />
      )}

    </>
  )
}

export default IngredientsGroup;