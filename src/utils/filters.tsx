import { RecipeContextType } from "../context/RecipeContext";
import { Ingredients, Instructions, Recipe, Ingredient } from './types';

/** Filters out template data */
export function filterTemplate(recipe: Recipe, template: Recipe) {
  const ingredients = compareIngredients(template.ingredients, recipe.ingredients) ? recipe.ingredients : null;
  const instructions = compareInstructions(template.instructions, recipe.instructions) ? recipe.instructions : null;
  const name = compareNames(template.name, recipe.name) ? recipe.name : null;
  const notes = compareNotes(template.notes, recipe.notes) ? recipe.notes : null
  
  if(!ingredients && !instructions && !name && !notes ) throw {"error": "no data to submit"}

  return {name, notes, ingredients, instructions}
}

/** Compares titles */
export function compareNames(original: string, edited: string) {
  return original === edited ? null : edited;
}

/** Executes quick comparison of ingredients */
export function compareIngredients(originals: Ingredients, edited: Ingredients) {
  const isAltered = edited.find((editedIngredient, index) => {

    return (
      // checks for empty ingredient input
      (editedIngredient.amount.id !== null || editedIngredient.unit.id !== null || editedIngredient.item.id !== null) &&
      //checks for differences between original and mutable ingredient
      (editedIngredient.amount.id !== originals[index]?.amount.id ||
        editedIngredient.unit.id !== originals[index]?.unit.id ||
        editedIngredient.item.id !== originals[index]?.item.id)
    )
  });
  return isAltered ? "altered" : null;
}

/** Executes quick comparison of instructions */
export function compareInstructions(original: Instructions, edited: Instructions) {
  const isAltered = edited.find((editedInstruction, index) => {
    // check out of bounds
    return editedInstruction.instruction !== (original[index] ? original[index].instruction : '')
  })
  return isAltered ? "altered" : null;
}

/** Executes quick comparison of notes */
export function compareNotes(original: string, edited: string) {
  return original === edited ? null : "altered";
}

/** Filters out recipe data that hasn't changed */
export function filterRecipe(originalRecipe: RecipeContextType, recipe: Recipe) {
  const filteredData = {
    "name": compareNames(originalRecipe.recipeName, recipe.name),
    "ingredients": filterIngredients(originalRecipe.contextIngredients, recipe.ingredients),
    "instructions": filterInstructions(originalRecipe.contextInstructions, recipe.instructions),
    "notes": filterNotes(originalRecipe.selectedNotes, recipe.notes)
  }
  return filteredData;
}

/** Compares edited to original notes, returns edited notes */
function filterNotes(original: string, edited: string) {
  if (edited === "") return edited
  return original === edited ? null : edited;
}

/** Compares edited to original instructions and filters out non-edited fields */
function filterInstructions(original: Instructions, edited: Instructions) {
  const alteredInstructions = edited.reduce((instructions, instruction, index) => {
    // handles indexing an empty element slot when an additional instruction is created
    // if edited doesn't === original return edited - first check that there is an original instructions on the same index
    if (instruction.instruction !== (original[index] ? original[index].instruction : "")) {
      const editedInstruction = {
        // association id = PK of association table
        // catches error if an additional input was created rather than replacing one
        "associationId": original[index] ? original[index].association_id : null,
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
function handleAdditionalInput(edited: Ingredient, originals: Ingredients, property: string, index: number) {
  if (!originals[index]) return edited[property];
  if (edited) return edited[property] === originals[index][property] ? null : edited[property]
}

/** Compares edited to original ingredients and filters out non-edited fields */
function filterIngredients(originalIngredients: Ingredients, edited: Ingredients) {
  const alteredIngredients = edited.reduce((alteredIngredients, editedIngredient, index) => {
    const amount = handleAdditionalInput(editedIngredient, originalIngredients, "amount", index)
    const item = handleAdditionalInput(editedIngredient, originalIngredients, "item", index)
    const unit = handleAdditionalInput(editedIngredient, originalIngredients, "unit", index)
    const alteredIngredient = {
      "id": editedIngredient.ingredient_id || null,
      // below can be refactored to only send id instead of entire object
      "amount": amount,
      "item": item,
      "unit": unit
    };
    const isInputModified = amount || item || unit;
    // adds only modified ingredients and not newly created empty ingredient input 
    if (isInputModified) {
      // differentiates between an empty ingredient input and modified ingredient
      const isAmountModified = amount ? amount.id : false;
      const isUnitModified = unit ? unit.id : false;
      const isItemModified = item ? item.id : false;

      const isIngredientModified = isAmountModified || isUnitModified || isItemModified;

      if (isIngredientModified) alteredIngredients.push(alteredIngredient);
    }
    return alteredIngredients;
  }, [])

  // removes empty ingredient inputs from mutated data that user left 
  const shouldInclude = alteredIngredients.filter((ingredient) => {
    return (ingredient.item || ingredient.amount || ingredient.unit)
  })

  return shouldInclude.length === 0 ? null : alteredIngredients;
}
