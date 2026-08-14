import { Instructions, IngredientOptions } from "../utils/types";
import { createContext } from "react";

type DataContextType = {
  ingredients: IngredientOptions;
  instructions: Instructions;
};

export const DataContext = createContext<DataContextType>({
  ingredients: { items:[], amounts:[], units: [] },
  instructions: [],
});
