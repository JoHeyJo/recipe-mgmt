import { createContext } from "react";
import { Instructions, Ingredients } from "../utils/types";

export type RecipeContextType = {
  recipeId: number;
  recipeName: string;
  contextInstructions: Instructions;
  selectedNotes: string;
  contextIngredients: Ingredients;
  requestAction: string;
};

export const RecipeContext = createContext<RecipeContextType | null>(null);
