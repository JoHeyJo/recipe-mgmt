import { Recipe, Ingredient, Instructions, Instruction, Ingredients, Book, AttributeData } from "./types";

export type InstructionManagerProps = {
  instruction: Instruction;
  arrayKey: number;
  options: Instructions;
  handleInstructions: any
}

export type IngredientInputGroupProps = {
  options: {
    items: AttributeData[]
    amounts: AttributeData[]
    units: AttributeData[]
  }
  ingredient: Ingredient;
  index: number;
  handleIngredient: {
    add: () => void,
    remove: (index: number) => void,
    update: (newIngredient: Ingredient, index: number) => void
  }
  handleOption: {
    post: (entity: string, attributeObject: AttributeData) => Promise<AttributeData>;
    set: (state: string, option: AttributeData) => void;
    associate: (userId: number, currentBookId: number, optionId: number, component: string) => void
  }
}

// type can be joined with OptionRequestsProps
export type IngredientManagerProps = {
  value: AttributeData;
  attribute: string
  options: AttributeData[];
  handleOption: {
    post: (entity: string, attributeObject: AttributeData) => Promise<AttributeData>;
    set: (state: string, option: AttributeData) => void;
    associate: (userId: number, currentBookId: number, optionId: number, component: string) => void
  }
  handleSelected: {
    update: (state: string, option: AttributeData) => void;
    remove: (state: string) => void
  }
  entity: string
}


export type IngredientRequestsProps = {
  ingredients: Ingredients;
  ingredientKeys: number[];
  handleIngredient: {
    add: ()=> void,
    remove: (index: number)=> void,
    update: (newIngredient: Ingredient, index: number) => void
  }
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
  defaultOption: string;
  options: Book[];
  selectOption: (id: number) => void;
}