import { useState, useEffect, useContext } from "react";
import { Ingredients, Ingredient } from "../../utils/types";
import { IngredientsGroupProps } from "../../utils/props";
import { RecipeContext } from "../../context/RecipeContext";
import { v4 as uuidv4 } from "uuid";
import { defaultIngredient, recipeTemplate } from "../../utils/templates";
import ComponentsOptionsRequests from "../requests/ComponentsOptionsRequests";

/** Handles selected Ingredients - mutation of ingredient's array - updates parent recipe state
 * Refactor: IngredientKeys can be removed and id associated with ingredient can now be used.
 * Need to choose between using DATE or UUID
 *
 * RecipeRequests -> IngredientsGroup -> ComponentsOptionsRequests
 */
function IngredientsGroup({ handleRecipeUpdate }: IngredientsGroupProps) {
  const { requestAction, contextIngredients } = useContext(RecipeContext);
  const [ingredients, setIngredients] = useState<Ingredients>(
    contextIngredients.length === 0 ? recipeTemplate.ingredients : contextIngredients
  );
  const [ingredientKeys, setIngredientKeys] = useState<any>([Date.now()]); // Generate unique key on first render

  /** Create unique keys array needed for children components */
  useEffect(() => {
    if (requestAction === "edit") {
      setIngredientKeys((keys) => {
        return contextIngredients.map(() => uuidv4());
      });
    }
  }, []);

  /** Handles adding new ingredient to array of ingredients */
  function addIngredient() {
    const newKey = Date.now();
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      defaultIngredient,
    ]);
    setIngredientKeys((prevKeys) => [...prevKeys, newKey]);
  }

  /** Handles removing ingredient object from array of ingredients */
  function removeIngredient(index: number) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index),
    );

    setIngredientKeys((prevKeys) => prevKeys.filter((_, i) => i !== index));
  }

  /** Handles updates ingredient in array of ingredients */
  function updateIngredients(newIngredient: Ingredient, index: number) {
    setIngredients((prevIngredients) => {
      const newIngredients = [...prevIngredients];
      newIngredients[index] = newIngredient;
      return newIngredients;
    });
  }

  const handleIngredient = {
    add: addIngredient,
    remove: removeIngredient,
    update: updateIngredients,
  };

  /** Updates parent state of ingredients when ingredient is added to state */
  useEffect(() => {
    handleRecipeUpdate(ingredients, "ingredients");
  }, [ingredients]);

  return (
    <div
      id="IngredientsGroup-main"
      className="h-full flex flex-col overflow-hidden border-2 border-green-300"
    >
      <ComponentsOptionsRequests
        ingredients={ingredients}
        ingredientKeys={ingredientKeys}
        handleIngredient={handleIngredient}
      />
    </div>
  );
}

export default IngredientsGroup;
