import { RecipeContextType } from "../context/RecipeContext";
import { Recipe } from './types';

/** Filters out recipe data that hasn't changed */
export function filterRecipe(originalRecipe: RecipeContextType, recipe: Recipe) {
  const filteredData = {
    "name": originalRecipe.recipeName === recipe.name ? null : recipe.name,
    "ingredients": filterIngredients(originalRecipe.contextIngredients, recipe.ingredients),
    "instructions": filterInstructions(originalRecipe.contextInstructions, recipe.instructions),
    "notes": filterNotes(originalRecipe.selectedNotes, recipe.notes)
  }
  return filteredData;
}

/** Compares edited to original notes, returns edited notes */
function filterNotes(original, edited) {
  return original === edited ? null : edited;
}

/** Compares edited to original instructions and filters out non-edited fields */
function filterInstructions(original, edited) {
  const alteredInstructions = edited.reduce((instructions, instruction, index) => {
    // handles indexing an empty element slot when an additional instruction is created
    // if edited doesn't === original return edited (first check that there is an original instructions on the same index)
    if (instruction.instruction !== (original[index] ? original[index].instruction : "")) {
      const editedInstruction = {
        // assocaite id = PK of association table
        "associationId": original[index].association_id,
        "newId": instruction.id,
        // "instruction": instruction.instruction  
      }
      instructions.push(editedInstruction);
    }
    return instructions;
  }, [])
  return alteredInstructions.length === 0 ? null : alteredInstructions;
}

// Applies when additional ingredient fields are added. Prevents reading undefined prop 
function handleAdditionalInput(edited, originals, property: string, index) {
  if (!originals[index]) return edited[property];
  if (edited) return edited[property] === originals[index][property] ? null : edited[property]
}

/** Compares edited to original ingredients and filters out non-edited fields */
function filterIngredients(originalIngredients, edited) {
  const alteredIngredients = edited.reduce((alteredIngredients, editedIngredient, index) => {
    const amount = handleAdditionalInput(editedIngredient, originalIngredients, "amount", index)
    const item = handleAdditionalInput(editedIngredient, originalIngredients, "item", index)
    const unit = handleAdditionalInput(editedIngredient, originalIngredients, "unit", index)
    const alteredIngredient = {
      "id": editedIngredient.ingredient_id,
      // below  can be refactored to only send id instead of entire object
      "amount": amount,
      "item": item,
      "unit": unit
    };
    // catches empty ingredient 
    if (amount || item || unit) alteredIngredients.push(alteredIngredient);
    return alteredIngredients;
  }, [])

  // removes empty ingredient inputs that user left 
  const shouldInclude = alteredIngredients.filter((ingredient) => {
    return (ingredient.amount.id || ingredient.amount.id || ingredient.unit.id)
  })

  return shouldInclude.length === 0 ? null : alteredIngredients;
}