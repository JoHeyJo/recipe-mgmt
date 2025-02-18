import { Recipe, Ingredient, Instructions, Instruction, Ingredients, Book, AttributeData } from "./types";

export type InstructionManagerProps = {
  instruction: Instruction;
  arrayKey: number;
  options: Instructions;
  handleInstructions: any
}

export type Options = {
  items: AttributeData[];
  amounts: AttributeData[];
  units: AttributeData[];
  selected: string;
  references: {
    item: AttributeData[];
    amount: AttributeData[];
    unit: AttributeData[];
  }
}



type HandleIngredient = {
  add: () => void,
  remove: (index: number) => void,
  update: (newIngredient: Ingredient, index: number) => void
}

type HandleOption = {
  post: (entity: string, attributeObject: AttributeData) => Promise<AttributeData>;
  addCreated: (state: string, option: AttributeData) => void;
  associate: (userId: number, currentBookId: number, optionId: number, component: string) => void
}

export type IngredientInputGroupProps = {
  options: Options;
  ingredient: Ingredient;
  index: number;
  handleIngredient: HandleIngredient;
  handleOption: HandleOption
}

export type ComponentsOptionsRequestsProps = {
  ingredients: Ingredients;
  ingredientKeys: number[];
  handleIngredient: HandleIngredient
}

// type can be joined with OptionRequestsProps
export type IngredientManagerProps = {
  value: AttributeData;
  attribute: string
  options: AttributeData[];
  handleOption: HandleOption
  handleComponent: {
    updateSelected: (state: string, option: AttributeData) => void;
    removeSelected: (state: string) => void
  }
  entity: string
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
  handleUpdate: (e: any) => void;
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
  defaultOption: string;
  options: Book[];
  selectOption: (id: number) => void;
}