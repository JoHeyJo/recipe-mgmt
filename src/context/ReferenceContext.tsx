import { createContext, MutableRefObject } from "react";

export type RefContextType = {
  DialogPanelRef: MutableRefObject<HTMLDivElement | null>;
};

export const RefContext = createContext<RefContextType>({
  DialogPanelRef: null
})