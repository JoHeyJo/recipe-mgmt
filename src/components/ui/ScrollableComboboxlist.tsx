import { PortalCombobox } from "./PortalCombobox";
import { useRef } from "react";

export default function ScrollableComboboxList() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const items = Array.from({ length: 15 }, (_, i) => `Item ${i + 1}`);

  return (
    <div className="h-96 overflow-y-auto border border-gray-400 rounded-lg p-4 space-y-4 w-80 mx-auto">
      {items.map((label, index) => (
        <PortalCombobox
          key={index}
          label={label}
          scrollContainerRef={scrollContainerRef}
        />
      ))}
    </div>
  );
}
