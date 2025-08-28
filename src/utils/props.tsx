import {
  Recipe,
  Ingredient,
  Instructions,
  Instruction,
  Ingredients,
  Book,
  AttributeData,
} from "./types";

type HandleInstruction = {
  post: (instruction: Instruction) => Promise<Instruction>;
  associate: (
    userId: number,
    currentBookId: number,
    instructionId: number
  ) => void;
  addCreated: (instruction: Instruction) => void;
};

export type InstructionManagerProps = {
  numOfInstruction: number;
  instruction: Instruction;
  arrayKey: number;
  options: Instructions;
  handleInstruction: HandleInstruction;
  handleSelected: {
    updateSelected: (instruction: Instruction, arrayKey: number) => void;
    removeSelected: (instructionKey: number) => void;
    createInput: () => void;
  };
};

export type Options = {
  items: AttributeData[];
  amounts: AttributeData[];
  units: AttributeData[];
  selected: string;
  references: {
    item: AttributeData[];
    amount: AttributeData[];
    unit: AttributeData[];
  };
};

type HandleRecipe = {
  handleRecipe: (
    data: string | Ingredient[] | Instruction | Instructions,
    section: string
  ) => void;
};

type HandleIngredient = {
  add: () => void;
  remove: (index: number) => void;
  update: (newIngredient: Ingredient, index: number) => void;
};

type HandleOption = {
  post: (
    entity: string,
    attributeObject: AttributeData
  ) => Promise<AttributeData>;
  addCreated: (state: string, option: AttributeData) => void;
  associate: (
    userId: number,
    currentBookId: number,
    optionId: number,
    component: string
  ) => void;
};

export type InstructionsRequestsProp = {
  handleRecipeUpdate: (data: Instructions, section: string) => void;
};

export type IngredientInputGroupProps = {
  options: Options;
  ingredient: Ingredient;
  index: number;
  handleIngredient: HandleIngredient;
  handleOption: HandleOption;
};

export type ComponentsOptionsRequestsProps = {
  numOfIngredients: number;
  ingredients: Ingredients;
  ingredientKeys: number[];
  handleIngredient: HandleIngredient;
};

export type IngredientManagerProps = {
  value: AttributeData;
  attribute: string;
  options: AttributeData[];
  handleOption: HandleOption;
  handleComponent: {
    updateSelected: (state: string, option: AttributeData) => void;
    removeSelected: (state: string) => void;
  };
  entity: string;
};

export type IngredientsViewProp = {
  ingredients: Ingredient[];
};
export type InstructionsViewProp = {
  instructions: Instructions;
  prevSectionLength: number;
};

export type NotesViewProp = {
  notes: string;
  prevSectionLength: number;
};

export type RecipeRequestsProps = {
  recipeActions: {
    updateRecipes: (recipe: Recipe) => void;
    deleteRecipe: () => void;
    editRecipe: () => void;
  };
  setShowing: any;
  isOpen: boolean;
};

export type RecipeViewProps = {
  recipe: Recipe;
  handleModalToggle: () => void;
  isOpen: boolean;
};

export type IngredientsGroupProps = {
  handleRecipeUpdate: (data: Ingredient[], section: string) => void;
};

type InstructionsData = {
  instructions: Instructions;
  selected: string;
  references: Instructions;
};

export type InstructionsAreaProps = {
  handleRecipeUpdate: (data: Instructions, section: string) => void;
  data: InstructionsData;
  handleInstruction: HandleInstruction;
};

export type FaPlusButtonProp = {
  onAction: () => void;
};

export type FaMinusButtonProp = {
  onAction: () => void;
};

export type NotesInputProps = {
  handleUpdate: (data: string, section: string) => void;
};

export type RecipesListProps = {
  recipes: Recipe[];
  handleSelect: (index: number) => void;
  selectedId: number;
};

export type InputWithLabelProps = {
  handleUpdate: (e: any) => void;
  id: string;
  name: string;
  value: string;
  type: string;
  placeholder: string;
};

export type RecipeInfoProp = {
  handleUpdate: (data: string, section: string) => void;
};

export type MultiSelectProp = {
  selected: Book;
  options: Book[];
  handleIdChange: (id: number) => void;
};

export type BookViewProp = {
  resetSelected: () => void;
};

export type TextAreaProps = {
  id: string;
  name: string;
  rows: number;
  placeholder: string;
  defaultValue: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export type SearchProps = {
  list: Recipe[];
  setList: (list: Recipe[]) => void;
};
