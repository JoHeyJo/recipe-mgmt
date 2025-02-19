import { useState, useEffect, useContext, ChangeEvent } from 'react';
import IngredientInputGroup from './IngredientInputGroup';
import { Ingredients, Ingredient } from '../../utils/types';
import { IngredientsGroupProps } from '../../utils/props';
import { RecipeContext } from '../../context/RecipeContext';
import { v4 as uuidv4 } from 'uuid';
import { defaultIngredient, recipeTemplate } from '../../utils/templates';
import ComponentsOptionsRequests from '../requests/ComponentsOptionsRequests';

/** Contains grouped ingredients for processing - handles mutation of ingredient's array 
 * Refactor: IngredientKeys can be removed and id associated with ingredient can now be used.
 * Need to choose between using DATE or UUID
 * 
 * RecipeRequests -> IngredientsGroup -> ComponentsOptionsRequests
 */
function IngredientsGroup({ handleRecipe }: IngredientsGroupProps) {
  const { requestAction, contextIngredients } = useContext(RecipeContext);
  const [ingredients, setIngredients] = useState<Ingredients>(contextIngredients || recipeTemplate.ingredients);
  const [ingredientKeys, setIngredientKeys] = useState<any>([Date.now()]); // Generate unique key on first render

  /** Create unique keys array needed for children components */
  useEffect(() => {
    if (requestAction === "edit") {
      setIngredientKeys(keys => {
        return contextIngredients.map(() => uuidv4())
      })
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

  const handleIngredient = {
    add: addIngredient,
    remove: removeIngredient,
    update: updateIngredients
  };

  /** Updates parent state of ingredients when ingredient is added to state */
  useEffect(() => {
    handleRecipe(ingredients, "ingredients")
  }, [ingredients])

  return (
    <div id='IngredientsGroup-main'>
      <ComponentsOptionsRequests ingredients={ingredients} ingredientKeys={ingredientKeys} handleIngredient={handleIngredient} />
    </div>
  )
}

export default IngredientsGroup;