import { createContext } from "react";

export type UserContextType = {
  user: string | undefined;
  userId: number | undefined;
  isAdmin: boolean | undefined;
  // token: string;
}

export const UserContext = createContext<UserContextType>({
  user: '',
  userId: undefined,
  isAdmin: false,
  // token: ''
})  