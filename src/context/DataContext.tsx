import { Options } from "../utils/props";
import { Instructions } from "../utils/types";
import { createContext } from "react";


type DataContextType = {
  ingredients: Options;
  instructions: Instructions;
}

export const DataContext = createContext<DataContextType>({
  ingredients: [],
  instructions: [],
});
