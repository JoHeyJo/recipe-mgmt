import { Recipe } from "./types";
export type AddRecipeProps = {
  setShowing: any;
  isOpen: boolean;
  handleRecipesUpdate: (recipe: Recipe) => void;
}

export type RecipeViewProps = {
  recipe: Recipe;
  handleRecipesUpdate: (recipe: Recipe) => void;
}
