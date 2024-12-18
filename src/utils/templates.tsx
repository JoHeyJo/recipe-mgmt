import { Recipe, Ingredient } from "./types"

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