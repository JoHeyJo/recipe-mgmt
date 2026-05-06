import { createContext } from "react";
import { Instructions, Ingredients, Recipe } from "../utils/types";

export type RecipeContextType = {
  selectedRecipe: {
    id?: number;
    created_by_id?: number;
    name: string;
    instructions: Instructions;
    notes: string;
    ingredients: Ingredients;
  };
  requestAction: string;
  updateRecipes?: (recipe: Recipe) => void;
};

export const RecipeContext = createContext<RecipeContextType | null>({
  selectedRecipe: {
    id: null,
    created_by_id: null,
    name: "",
    instructions: [],
    notes: "",
    ingredients: [],
  },
  updateRecipes: () => {},
  requestAction: "",
});
