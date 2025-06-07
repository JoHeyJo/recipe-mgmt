import { createContext } from "react";
import { User, Book } from "../utils/types";

export type UserContextType = {
  user: string | undefined;
  userId: number | undefined;
  currentBookId: number;
  defaultBook;
  books: Book[];
  setUserData: React.Dispatch<React.SetStateAction<User>>;
  defaultBookId: number | undefined;
  token: string;
  isLoading: boolean;
  isInitialized: boolean
};

export const UserContext = createContext<UserContextType>({
  user: "",
  userId: undefined,
  currentBookId: undefined,
  defaultBook: {},
  books: [],
  setUserData: () => {},
  defaultBookId: undefined,
  token: "",
  isLoading: true,
  isInitialized: false
});
