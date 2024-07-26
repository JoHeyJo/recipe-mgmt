import { useState } from 'react';
import IngredientInputGroup from './IngredientInputGroup';
import { Ingredient } from '../../utils/types';
import { PillButton } from './PillButton';

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

  function updateIngredients(newIngredient: any) {
    setIngredients((ingredients) =>  {
      console.log(ingredients[1])
      const newI = newIngredient
      const i = [...ingredients,newI]
      return [i]
    })
  }

  return (
    <>
      <button onClick={addIngredient}>add</button>
      {ingredients.map((ingredient, i) =>
        <IngredientInputGroup key={i} ingredient={ingredient} update={updateIngredients} />
      )}

    </>
  )
}

export default IngredientsGroup;