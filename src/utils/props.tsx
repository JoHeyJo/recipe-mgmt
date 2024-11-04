import { Recipe, Ingredient, Instructions, Instruction, Ingredients } from "./types";
import { ChangeEvent } from "react";

export type InstructionManagerProps = {
  value: Instruction;
  name: string;
  arrayKey: number;
  handleOptionChange: (state: string, option: Instruction) => void;
  options: Instructions;
  handleInstructions: any
}

export type IngredientsViewProp = {
  ingredients: Ingredient[];
}
export type InstructionsViewProp = {
  instructions: Instructions;
}

export type NotesViewProp = {
  notes: string;
}

export type AddRecipeProps = {
  recipeTemplate: Recipe;
  setShowing: any;
  isOpen: boolean;
  handleRecipesUpdate: (recipe: Recipe) => void;
}

export type RecipeViewProps = {
  recipe: Recipe;
  handleModalToggle: () => void;
  isOpen: boolean;
  handleRecipesUpdate: (recipe: Recipe) => void;
}

export type IngredientsGroupProps = {
  handleUpdate: (data: Ingredient[], section: string) => void;
  values: Ingredients;
}

export type InstructionAreaProps = {
  handleUpdate: (instructions: Instructions, section: string) => void;
  values: Instructions;
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

export type RecipesListProps = {
  recipes: Recipe[]
  handleSelect: (index: number) => void;
}