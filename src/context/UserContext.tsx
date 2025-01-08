import { createContext } from "react";
import { User, Book } from "../utils/types";

export type UserContextType = {
  user: string | undefined;
  userId: number | undefined;
  currentBookId: number;
  books: Book[];
  setUserData: React.Dispatch<React.SetStateAction<User>>
  defaultBookId: number | undefined;
}

export const UserContext = createContext<UserContextType>({
  user: '',
  userId: undefined,
  currentBookId: undefined,
  books: [],
  setUserData: () => {},
  defaultBookId: undefined
})  