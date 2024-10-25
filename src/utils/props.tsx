import { Recipe, Ingredient, Instructions } from "./types";
import { ChangeEvent } from "react";

export type IngredientsViewProp = {
  ingredients: Ingredient[];
}
export type InstructionsViewProp = {
  instructions: Instructions;
}

export type NotesViewProp = {
  notes: string[];
}

export type AddRecipeProps = {
  setShowing: any;
  isOpen: boolean;
  handleRecipesUpdate: (recipe: Recipe) => void;
}

export type RecipeViewProps = {
  recipe: Recipe;
  handleRecipesUpdate: (recipe: Recipe) => void;
}

export type IngredientsGroupProps = {
  handleUpdate: (data: Ingredient[], section: string) => void;
}

export type FaPlusButtonProp = {
  onAction: () => void;
}

export type FaMinusButtonProp = {
  onAction: () => void;
}

export type NotesInputProps = {
  handleUpdate: (data: string, section: string) => void;
}