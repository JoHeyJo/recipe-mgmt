import { createContext } from "react";

export type WebSocketType = {
  sendRecipe: () => void;
  sendBook: () => void;
  message: string;
  resetMessage: () => void;
  status: number;
};

export const WebSocketContext = createC;
