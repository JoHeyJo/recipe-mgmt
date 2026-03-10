import { createContext } from "react";

export type WebSocketType = {
  sendRecipe: (recipient: string) => void;
  sendBook: (recipient: string) => void;
  message: string;
  resetMessage: () => void;
  status: number;
};

export const WebSocketContext = createContext<WebSocketType>({
  sendRecipe: () => {},
  sendBook: () => {},
  message: "",
  resetMessage: () => {},
  status: 0,
});
