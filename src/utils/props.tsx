import { Recipe, Ingredient, Instructions, Instruction, Ingredients, Option, Book } from "./types";

export type InstructionManagerProps = {
  instruction: Instruction;
  arrayKey: number;
  handleOptionChange: (state: string, option: Instruction) => void;
  options: Instructions;
  handleInstructions: any
}

export type IngredientInputGroupProps = {
  handleUpdate: (newIngredient: Ingredient, index: number) => void;
  ingredient: Ingredient;
  index: number;
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

export type RecipeRequestsProps = {
  recipeActions: {
    updateRecipes: (recipe: Recipe) => void;
    deleteRecipe: () => void;
    editRecipe: () => void;
  }
  setShowing: any;
  isOpen: boolean;
}

export type RecipeViewProps = {
  recipe: Recipe;
  handleModalToggle: () => void;
  isOpen: boolean;
}

export type IngredientsGroupProps = {
  handleUpdate: (data: Ingredient[], section: string) => void;
}

export type InstructionsAreaProps = {
  handleUpdate: (data: Instruction | Instructions, section: string) => void;
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

export type InputWithLabelProps = {
  handleUpdate: (e:any) => void;
  id: string;
  name: string;
  value: string;
  type: string
  placeholder: string;
}

export type RecipeInfoProp = {
  handleUpdate: (data: string, section: string) => void;
}

export type MultiSelectProp = {
  books: Book[];
}