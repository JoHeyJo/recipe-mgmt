import { createContext } from "react";

export type UserContextType = {
  user: string |undefined;
  isAdmin: boolean | undefined; 
  // token: string;
}

export const UserContext = createContext<UserContextType>({
  user: '',
  isAdmin: false,
  // token: ''
})  