import { useState } from 'react';
import IngredientInputGroup from './IngredientInputGroup';
/** Contains a list of ingredients 
 * 
 * 
 * Modal -> IngredientsGroup -> IngredientInputGroup
 */
function IngredientsGroup() {
  const [ingredients, setIngredients] = useState(<IngredientInputGroup/>);
  return (
    <>
    {ingredients}
    </>
  )
}

export default IngredientsGroup;