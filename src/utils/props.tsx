import { Recipe, Ingredient, Instructions, Instruction, Ingredients, Option } from "./types";

export type InstructionManagerProps = {
  instruction: Instruction;
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

export type RecipeRequestsProps = {
  selectedRecipe:Recipe;
  setShowing: any;
  isOpen: boolean;
  handleRecipesUpdate: (recipe: Recipe) => void;
  handleRecipeDelete: () => void;
}

export type RecipeViewProps = {
  recipe: Recipe;
  handleModalToggle: () => void;
  isOpen: boolean;
  handleRecipesUpdate: (recipe: Recipe) => void;
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