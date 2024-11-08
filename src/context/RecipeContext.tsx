import { createContext } from "react";
import { Instructions, Ingredients } from "../utils/types";

export type RecipeContextType = {
  id: number;
  name: string,
  contextInstructions: Instructions,
  selectedNotes: string,
  ingredients: Ingredients;
}

export const RecipeContext = createContext<RecipeContextType>({
  id: 0,
  name: '',
  contextInstructions: [],
  selectedNotes: "",
  ingredients: []
})