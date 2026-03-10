import useWebSocket from "../hooks/useWebSocket";
import { createContext } from "react";

const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
  // Hook lives here — inside UserContext and RecipeContext providers
  // so it can consume them, and its state is shared with all children
  const { message, sendBook, sendRecipe, resetMessage, status } =
    useWebSocket();

  return (
    <WebSocketContext.Provider
      value={{ message, sendBook, sendRecipe, resetMessage, status }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}
