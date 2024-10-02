import { createContext } from "react";

export type UserContextType = {
  user: string | undefined;
  userId: number | undefined;
  isAdmin: boolean | undefined;
  currentBook?: number;
  books?: [];
  setBook: () => void;
  setBooks: () => void;
  // token: string;
}

export const UserContext = createContext<UserContextType>({
  user: '',
  userId: undefined,
  isAdmin: false,
  currentBook: undefined,
  books: [],
  setBooks: () => {},
  setBook: () => {},
  // token: ''
})  