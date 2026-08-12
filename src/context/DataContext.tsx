import { Ingredients, Instructions } from "../utils/types";
import { createContext } from "react";

type IngredientContextType = {
  ingredients: Ingredients;
};

type InstructionsContextType = {
  instructions: Instructions;
};

export const ingredientContext = createContext<IngredientContextType>({
  ingredients: [],
});

export const instructionsContext = createContext<InstructionsContextType>({
  instructions: [],
});
