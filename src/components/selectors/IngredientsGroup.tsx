import { useState, useEffect } from 'react';
import IngredientInputGroup from './IngredientInputGroup';
import { Ingredient } from '../../utils/types';
import { IngredientsGroupProps } from '../../utils/props';
import FaPlusButton from '../ui/common/FaPlusButton';
import FaMinusButton from '../ui/common/FaMinusButton';



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
function IngredientsGroup({ values, handleUpdate }: IngredientsGroupProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([defaultIngredient]);
  // const [ingredients, setIngredients] = useState<Ingredient[]>(values.length === 0 ? [defaultIngredient] : values);
  const [ingredientKeys, setIngredientKeys] = useState<number[]>([Date.now()]); // Generate unique key on first render

  /** Handles adding new ingredient to array of ingredients */
  function addIngredient() {
    const newKey = Date.now();
    setIngredients(prevIngredients => [...prevIngredients, defaultIngredient])
    setIngredientKeys(prevKeys => [...prevKeys, newKey]);
  }

  /** Handles removing ingredient object from array of ingredients */
  function removeIngredient(index: number) {
    setIngredients(prevIngredients => prevIngredients.filter((_, i) => i !== index));
    setIngredientKeys(prevKeys => prevKeys.filter((_, i) => i !== index)); 
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
    // removed ingredients dependency so that recipe in parent doesn't get overwritten 
  }, [ingredients])
  return (
    <div id='IngredientsGroup-main'>
      {values.length === 0
      ?
      ingredients.map((ingredient, i) =>
        <div key={ingredientKeys[i]} className='flex items-center justify-center'>
          <IngredientInputGroup index={i} ingredientTemplate={ingredient} handleUpdate={updateIngredients} />
          {i === ingredients.length - 1 ? <FaPlusButton onAction={addIngredient} /> : <FaMinusButton onAction={() => removeIngredient(i)} />}
        </div>
      )
      :
      values.map((ingredient, i) =>
        <div key={ingredientKeys[i]} className='flex items-center justify-center'>
          
          <IngredientInputGroup index={i} ingredientTemplate={ingredient} handleUpdate={updateIngredients} />
          {i === ingredients.length - 1 ? <FaPlusButton onAction={addIngredient} /> : <FaMinusButton onAction={() => removeIngredient(i)} />}
        </div>
      )}
    </div>
  )
}

export default IngredientsGroup;