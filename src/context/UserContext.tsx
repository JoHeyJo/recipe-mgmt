import { createContext } from "react";
import { User, Book } from "../utils/types";
import { defaultBook } from "../utils/templates";

export type UserContextType = {
  user: string | null;
  userId: number | null;
  currentBookId: number;
  defaultBook: Book;
  books: Book[];
  setUserData: React.Dispatch<React.SetStateAction<User>>;
  defaultBookId: number | null;
  currentBook: Book;
  token: string;
  isLoading: boolean;
  isInitialized: boolean;
  PRIVILEGES: {
    full: boolean;
    collaborator: boolean;
    sharedInbox: boolean;
    viewer: boolean;
  };
};

export const UserContext = createContext<UserContextType>({
  user: "",
  userId: null,
  currentBookId: null,
  defaultBook: defaultBook,
  books: [],
  setUserData: () => {},
  defaultBookId: null,
  currentBook: defaultBook,
  token: "",
  isLoading: true,
  isInitialized: false,
  PRIVILEGES: {
    full: false,
    collaborator: false,
    sharedInbox: false,
    viewer: false,
  },
});
