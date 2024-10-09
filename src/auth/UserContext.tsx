import { createContext } from "react";
import { User } from "../utils/types";

export type UserContextType = {
  user: string | undefined;
  userId: number | undefined;
  isAdmin: boolean | undefined;
  currentBookId: number;
  booksIds: number[];
  setUserData: React.Dispatch<React.SetStateAction<User>>
  defaultBookId: number | undefined;
}

export const UserContext = createContext<UserContextType>({
  user: '',
  userId: undefined,
  isAdmin: false,
  currentBookId: undefined,
  booksIds: [],
  setUserData: () => {},
  defaultBookId: undefined
})  