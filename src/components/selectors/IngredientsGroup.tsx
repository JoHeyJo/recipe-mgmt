import { useState, useEffect } from 'react';
import IngredientInputGroup from './IngredientInputGroup';
import { Ingredient } from '../../utils/types';
import { IngredientsGroupProps } from '../../utils/props';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


const defaultIngredient: Ingredient = {
  amount: { id: null, value: "" },
  unit: { id: null, type: "" },
  item: { id: null, name: "" }
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
    <div id='IngredientsGroup-main'>
      {ingredients.map((ingredient, i) =>
        <div className='flex items-center justify-center'>
          <IngredientInputGroup key={i} index={i} ingredientTemplate={ingredient} handleUpdate={updateIngredients} />
          {i === ingredients.length - 1
            &&
            <button
              onClick={addIngredient}
              className="font-semibold leading-7 ml-1 text-gray-900 hover:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-zinc-600"              >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          }
        </div>
      )}
    </div>
  )
}

export default IngredientsGroup;