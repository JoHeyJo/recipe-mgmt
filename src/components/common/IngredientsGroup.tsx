import { useState, useEffect } from 'react';
import IngredientInputGroup from './IngredientInputGroup';
import { Ingredient } from '../../utils/types';
import { PillButton } from './PillButton';
import { PlusIcon } from '@heroicons/react/20/solid'


const defaultIngredient: Ingredient = {
  ingredient: { id: null, liquid: "" },
  amount: { id: null, amount: "" },
  unit: { id: null, unit: "" }
}

type IngredientsGroupProps = {
  handleUpdate: (data: Ingredient[], section: string) => void;
}

/** Contains a list of ingredients 
 * 
 * 
 * AddRecipe -> IngredientsGroup -> IngredientInputGroup
 */
function IngredientsGroup({ handleUpdate }: IngredientsGroupProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([defaultIngredient]);

  /** Handles adding new ingredient to array of ingredients */
  function addIngredient() {
    setIngredients(i => [...i, defaultIngredient])
  }

  /** Handles updates ingredient in array of ingredients */
  function updateIngredients(newIngredient: Ingredient, index: number) {
    setIngredients((prevIngredients) => {
      const newIngredients = [...prevIngredients];
      newIngredients[index] = newIngredient
      return newIngredients
    })
  }

  /** Updates parent state of ingredients when ingredient is added to state */
  useEffect(() => {
    handleUpdate(ingredients, "ingredients")
  }, [ingredients])

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
        <IngredientInputGroup key={i} index={i} ingredientTemplate={ingredient} handleUpdate={updateIngredients} />
      )}
    </>
  )
}

export default IngredientsGroup;