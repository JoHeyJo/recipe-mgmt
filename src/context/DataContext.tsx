import { Instructions, IngredientOptions } from "../utils/types";
import { createContext } from "react";

type DataContextType = {
  ingredients: IngredientOptions;
  instructions: Instructions;
  setInstructions: React.Dispatch<React.SetStateAction<FormData>>;
  setIngredients: React.Dispatch<React.SetStateAction<FormData>>;
};

export const DataContext = createContext<DataContextType>({
  ingredients: { items:[], amounts:[], units: [] },
  instructions: [],
  setInstructions: () => {},
  setIngredients: () => {}
});
