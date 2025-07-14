import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const OPTIONS = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grapes",
  "Honeydew",
  "Kiwi",
  "Lemon",
  "Mango",
];

export function PortalCombobox({
  label,
  scrollContainerRef,
}: {
  label: string;
  scrollContainerRef: React.RefObject<HTMLElement>;
}) {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = OPTIONS.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase())
  );

  // Update dropdown position
  useEffect(() => {
    if (!dropdownOpen) return;

    const rect = wrapperRef.current?.getBoundingClientRect();
    if (rect) {
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [dropdownOpen, query]);

  // Close on scroll *outside* dropdown
  useEffect(() => {
    if (!dropdownOpen) return;

    const closeOnScroll = (event: Event) => {
      const target = event.target as HTMLElement;
      const isInsideDropdown = dropdownRef.current?.contains(target);
      const isInsideCombobox = wrapperRef.current?.contains(target);

      if (!isInsideDropdown && !isInsideCombobox) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", closeOnScroll, true);
    return () => {
      window.removeEventListener("scroll", closeOnScroll, true);
    };
  }, [dropdownOpen]);

  // Close on outside click
  useEffect(() => {
    if (!dropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div ref={wrapperRef} className="relative mt-2">
        <Combobox.Input
          placeholder={label}
          value={selected}
          onFocus={() => setDropdownOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(e.target.value);
            setDropdownOpen(true);
          }}
          onBlur={() => {
            setTimeout(() => setDropdownOpen(false), 150);
          }}
          className="w-full rounded-md border border-gray-300 py-1.5 pl-3 pr-10 text-sm shadow-sm"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
        </Combobox.Button>
      </div>

      {dropdownOpen &&
        filtered.length > 0 &&
        createPortal(
          <Combobox.Options
            ref={dropdownRef}
            className="absolute z-[9999] max-h-60 overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5"
            style={{
              top: dropdownPos.top,
              left: dropdownPos.left,
              width: dropdownPos.width,
              position: "absolute",
            }}
          >
            {filtered.map((option) => (
              <Combobox.Option
                key={option}
                value={option}
                className={({ active }) =>
                  `cursor-default select-none py-2 pl-3 pr-9 ${
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-semibold" : ""
                      }`}
                    >
                      {option}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>,
          document.body
        )}
    </Combobox>
  );
}
