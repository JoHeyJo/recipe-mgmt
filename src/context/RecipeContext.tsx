import { createContext } from "react";
import { Instructions, Ingredients, Recipe } from "../utils/types";

export type RecipeContextType = {
  recipeId?: number;
  created_by_id?: number;
  recipeName: string;
  contextInstructions: Instructions;
  selectedNotes: string;
  contextIngredients: Ingredients;
  requestAction: string;
  updateRecipes?: (recipe: Recipe) => void;
  dialogRef?: any;
};

export const RecipeContext = createContext<RecipeContextType | null>({
  recipeId: null,
  created_by_id: null,
  recipeName: "",
  contextInstructions: [],
  selectedNotes: "",
  contextIngredients: [],
  updateRecipes: () => {},
  requestAction: "",
});
