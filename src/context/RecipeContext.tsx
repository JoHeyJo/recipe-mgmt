import { createContext } from "react";
import { Instructions, Ingredients, Recipe, Recipes } from "../utils/types";

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
  setRecipes: React.Dispatch<any>;
  setFilteredRecipe: React.Dispatch<any>;
  recipes: []
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
  setRecipes: () => {},
  setFilteredRecipe: () => {},
  recipes: [],
});
