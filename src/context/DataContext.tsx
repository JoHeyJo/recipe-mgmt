import { Instructions, IngredientOptions } from "../utils/types";
import { createContext, Dispatch, SetStateAction } from "react";

type DataContextType = {
  ingredientOptions: IngredientOptions;
  instructions: Instructions;
  setInstructions: Dispatch<SetStateAction<Instructions>>;
  setIngredientOptions: Dispatch<SetStateAction<IngredientOptions>>;
};

export const DataContext = createContext<DataContextType>({
  ingredientOptions: { items:[], amounts:[], units: [] },
  instructions: [],
  setInstructions: () => {},
  setIngredientOptions: () => {}
});
