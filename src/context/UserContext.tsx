import { createContext } from "react";
import { User, Book } from "../utils/types";

export type UserContextType = {
  user: string | undefined;
  userId: number | undefined;
  currentBookId: number;
  defaultBook: Book;
  books: Book[];
  setUserData: React.Dispatch<React.SetStateAction<User>>;
  defaultBookId: number | undefined;
  currentBook: Book;
  token: string;
  isLoading: boolean;
  isInitialized: boolean;
};

const defaultBook = { id: 0, title: "", description: "" };

export const UserContext = createContext<UserContextType>({
  user: "",
  userId: undefined,
  currentBookId: undefined,
  defaultBook: defaultBook,
  books: [],
  setUserData: () => {},
  defaultBookId: undefined,
  currentBook: defaultBook,
  token: "",
  isLoading: true,
  isInitialized: false,
});
