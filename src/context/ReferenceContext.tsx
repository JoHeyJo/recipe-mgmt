import { createContext, MutableRefObject } from "react";

export type ReferenceContextType = {
  dialogPanelRef: MutableRefObject<HTMLDivElement | null>;
};

export const ReferenceContext = createContext<ReferenceContextType>({
  dialogPanelRef: null
})
