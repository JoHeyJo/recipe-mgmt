import { createContext } from "react";
import { Instructions, Ingredients } from "../utils/types";

export type RecipeContextType = {
  recipeId: number;
  name: string,
  contextInstructions: Instructions,
  selectedNotes: string,
  contextIngredients: Ingredients;
  requestAction: string;
}

export const RecipeContext = createContext<RecipeContextType>({
  recipeId: 0,
  name: '',
  contextInstructions: [],
  selectedNotes: "",
  contextIngredients: [],
  requestAction: ""
})