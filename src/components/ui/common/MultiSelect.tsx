import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MultiSelectProp } from "../../../utils/props";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Book } from "../../../utils/types";

/** Renders dropdown multiselect
 *
 * BookView -> MultiSelect
 */
function MultiSelect({ selected, options, handleIdChange }: MultiSelectProp) {
  /** Selects option and sets option title for display */
  function handleSelect(option: Book) {
    handleIdChange(option.id, option);
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-selected px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-light-border hover:bg-gray-50">
          {selected.title}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right max-h-60 overflow-auto rounded-md bg-primary shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {options.map((option) => (
            <MenuItem key={option.id}>
              <li
                onClick={() => handleSelect(option)}
                className={`group relative flex justify-between px-4 py-2 text-sm cursor-pointer data-[focus]:bg-selected data-[focus]:text-accent 
                  ${selected.id === option.id ? "text-gray-700 font-semibold" : "text-gray-700"}`}
              >
                <span className="block truncate">{option.title}</span>

                {selected.id === option.id && (
                  <FontAwesomeIcon
                    className="text-icon-color group-data-[focus]:text-accent"
                    icon={faCheck}
                  />
                )}
              </li>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}

export default MultiSelect;
