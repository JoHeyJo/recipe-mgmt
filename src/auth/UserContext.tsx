import { createContext } from "react";

export type UserContextType = {
  username: string;
  isAdmin: boolean;
  token: string;
}

export const UserContext = createContext<UserContextType>({
  username: '',
  isAdmin: false,
  token: ''
})