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
  const [ingredients, setIngredients] = useState<any[]>(['']);

  function addIngredient(){
    setIngredients(i => [...i,''])
  }

  function updateIngredients(newIngredient:any){
    // setIngredients(i => [...i, newIngredient])
  }

  return (
    <>
    <button onClick={addIngredient}>add</button>
    {ingredients.map((i) => 
      <IngredientInputGroup update={updateIngredients}/>
    )}
    
    </>
  )
}

export default IngredientsGroup;