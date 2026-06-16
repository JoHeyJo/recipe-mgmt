import { ChangeEvent } from "react";

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
    instructionId: number,
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

type HandleIngredient = {
  add: () => void;
  remove: (index: number) => void;
  update: (newIngredient: Ingredient, index: number) => void;
};

type HandleOption = {
  post: (
    entity: string,
    attributeObject: AttributeData,
  ) => Promise<AttributeData>;
  addCreated: (state: string, option: AttributeData) => void;
  associate: (
    userId: number,
    currentBookId: number,
    optionId: number,
    component: string,
  ) => void;
};

export type InstructionsRequestsProp = {
  onInstructionInput: (data: Instructions, section: string) => void;
};

export type IngredientInputGroupProps = {
  options: Options;
  ingredient: Ingredient;
  index: number;
  onIngredientAction: HandleIngredient;
  optionAction: HandleOption;
  length: number;
};

export type ComponentsOptionsRequestsProps = {
  numOfIngredients: number;
  ingredients: Ingredients;
  ingredientKeys: number[];
  ingredientAction: HandleIngredient;
};

export type IngredientManagerProps = {
  length: number;
  value: AttributeData;
  attribute: string;
  options: AttributeData[];
  handleOption: HandleOption;
  handleComponent: {
    updateSelected: (state: string, option: AttributeData) => void;
    removeSelected: (state: string) => void;
    handleError: (error: string) => void;
  };
  entity: string;
  placeholder: string;
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
  stateActions: {
    updateRecipes: (recipe: Recipe) => void;
    deleteRecipe: () => void;
    editRecipe: (edited_recipe: Recipe) => void;
  };
  closeDialog: () => void;
  isOpen: boolean;
};

export type RecipeViewProps = {
  recipe: Recipe;
  handleModalToggle: () => void;
};

export type IngredientsGroupProps = {
  onIngredientInput: (data: Ingredient[], section: string) => void;
};

type InstructionsData = {
  instructions: Instructions;
  selected: string;
  references: Instructions;
};

export type InstructionsAreaProps = {
  onInstructionInput: (data: Instructions, section: string) => void;
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
  onNotesInput: (data: string, section: string) => void;
};

export type RecipesListProps = {
  recipes: Recipe[];
  handleSelect: (index: number) => void;
  selectedId: number;
};

export type InputWithLabelProps = {
  onUpdate: (e: any) => void;
  id: string;
  name: string;
  value: string;
  type: string;
  placeholder: string;
};

export type RecipeInfoProp = {
  onTitleInput: (data: string, section: string) => void;
};

export type DropdownProp = {
  selected: Book;
  options: Book[];
  onChange: (id: number, selected: Book) => void;
  isActionCopy?: boolean;
  onCreateBook?: () => void;
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
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export type SearchProps = {
  list: Recipe[];
  setList: (list: Recipe[]) => void;
};

export type SharePopOutProps = {
  action: string;
  isDialogOpen: boolean;
  closeDialog: () => void;
};

export type InputWithLabelFormProps = {
  type: string;
  name: string;
  id: string;
  className: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  required: boolean;
  styles?: string;
};

export type ShareBookProp = {
  action: string;
};

export type AvatarFrameProp = {
  avatar: string | undefined;
};

export type UserAvatarProp = {
  title: string;
};

export type recipeAction = {
  submit: (e: any) => Promise<void>;
  remove: () => Promise<void>;
  delete: () => Promise<void>;
  edit: () => Promise<void>;
};

export type RecipeFormControlsProps = {
  recipeAction: recipeAction;
  isDisabled: boolean;
  openDropdown: () => void;
};
