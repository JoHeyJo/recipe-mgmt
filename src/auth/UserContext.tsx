import { createContext } from "react";
import { User } from "../utils/types";

export type UserContextType = {
  user: string | undefined;
  userId: number | undefined;
  isAdmin: boolean | undefined;
  currentBook?: number;
  books?: [];
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>
  defaultBookId: number | undefined;
}

export const UserContext = createContext<UserContextType>({
  user: '',
  userId: undefined,
  isAdmin: false,
  currentBook: undefined,
  books: [],
  setCurrentUser: () => {},
  defaultBookId: undefined
})  