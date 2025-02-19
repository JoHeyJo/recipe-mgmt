import { Recipe, Ingredient, Instructions } from "./types"

export const recipeTemplate: Recipe = {
  id: 0,
  name: "",
  instructions: [],
  notes: "",
  ingredients: [{
    id: 0,
    amount: { id: null, value: "" },
    unit: { id: null, type: "" },
    item: { id: null, name: "" }
  }]
}

export const defaultIngredient: Ingredient = {
  id: 0,
  amount: { id: null, value: "" },
  unit: { id: null, type: "" },
  item: { id: null, name: "" }
}

export const references = {
  amount: [],
  unit: [],
  item: []
}

export const defaultItem = { id: null, name: "" };
export const defaultAmount = { id: null, value: "" };
export const defaultUnit = { id: null, type: "" };

export const PLACE_HOLDER: Instructions = [
  { instruction: "Add ingredients...", id: null },
  { instruction: "Add ice...", id: null },
  { instruction: "Shake...", id: null }
]