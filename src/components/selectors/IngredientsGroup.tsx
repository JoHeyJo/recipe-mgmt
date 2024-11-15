import { useState, useEffect, useContext } from 'react';
import IngredientInputGroup from './IngredientInputGroup';
import { Ingredient } from '../../utils/types';
import { IngredientsGroupProps } from '../../utils/props';
import FaPlusButton from '../ui/common/FaPlusButton';
import FaMinusButton from '../ui/common/FaMinusButton';
import { RecipeContext } from '../../context/RecipeContext';
import { v4 as uuidv4 } from 'uuid';



const defaultIngredient: Ingredient = {
  amount: { id: null, value: "" },
  unit: { id: null, type: "" },
  item: { id: null, name: "" }
}

/** Contains a list of ingredients 
 * 
 * Need to choose between using DATE or UUID
 * 
 * RecipeRequests -> IngredientsGroup -> IngredientInputGroup
 */
function IngredientsGroup({ handleUpdate }: IngredientsGroupProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientKeys, setIngredientKeys] = useState<any>([Date.now()]); // Generate unique key on first render

  const { requestAction, contextIngredients } = useContext(RecipeContext);

  /** Populate recipe form with current ingredients on EDIT or set blank default*/
  useEffect(() => {
    if (requestAction === "edit") {
      setIngredients(contextIngredients)
      setIngredientKeys(keys => {
        return contextIngredients.map(() => uuidv4())
      })
    } else {
      setIngredients([defaultIngredient])
    }
  }, [])

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
  }, [ingredients])

  return (
    <div id='IngredientsGroup-main'>
      {ingredients.map((ingredient, i) =>
        <div key={ingredientKeys[i]} className='flex items-center justify-center'>
          <IngredientInputGroup index={i} ingredientTemplate={ingredient} handleUpdate={updateIngredients} />
          {i === ingredients.length - 1 ? <FaPlusButton onAction={addIngredient} /> : <FaMinusButton onAction={() => removeIngredient(i)} />}
        </div>
      )}
    </div>
  )
}

export default IngredientsGroup;