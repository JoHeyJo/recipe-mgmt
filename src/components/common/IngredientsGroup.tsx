import { useState } from 'react';
import IngredientInputGroup from './IngredientInputGroup';
import { Ingredient } from '../../utils/types';
import { PillButton } from './PillButton';
/** Contains a list of ingredients 
 * 
 * 
 * AddRecipe -> IngredientsGroup -> IngredientInputGroup
 */
function IngredientsGroup() {
  const [ingredients, setIngredients] = useState<string[]>(['']);

  function addIngredient(){
    setIngredients(i => [...i,''])
  }

  return (
    <>
    <button onClick={addIngredient}>add</button>
    {ingredients.map((i) => 
      <IngredientInputGroup />
    )}
    
    </>
  )
}

export default IngredientsGroup;