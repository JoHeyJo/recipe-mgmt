import { useState, useEffect, useRef } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Instruction } from "../../utils/types";
import { InstructionManagerProps } from "../../utils/props";
import { createPortal } from "react-dom";
import { scrollToElement } from "../../utils/functions";

/** InstructionManager - renders instructions - ring is removed
 *
 * Searches and filters existing instructions
 *
 * InstructionsArea -> InstructionManager
 */

function InstructionManager({
  arrayKey,
  instruction,
  options,
  handleSelected,
  handleInstruction,
}: InstructionManagerProps) {
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<Instruction>(instruction);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const [isKbSuppressed, setIsKbSuppressed] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isNewInstruction = (option: Instruction) =>
    typeof option.id === "string" && option.instruction === "+ create...";

  useEffect(() => {
    setSelected(instruction);
  }, []);

  /** Creates a list of filtered options based on search query */
  const filteredOptions: Instruction[] =
    query === "" ? options : filterOptions();

  /** Filters options => all options / matching options / no match or no options = create... */
  function filterOptions() {
    if (options.length === 0) {
      return [{ id: `create-${Math.random()}`, instruction: "+ create..." }];
    } else {
      return options.reduce<Instruction[]>((currentOptions, option) => {
        const isOptionAvailable = option.instruction
          .toLowerCase()
          .includes(query.toLowerCase());
        if (isOptionAvailable) currentOptions.push(option);
        //renders "+ create" option if query value doesn't exist in the dropdown options
        if (currentOptions.length < 1 && !isOptionAvailable)
          currentOptions.push({
            id: `create-${Math.random()}`,
            instruction: "+ create...",
          });
        return currentOptions;
      }, []);
    }
  }

  /** Injects query string prior to POST request and updates parent state  */
  async function processNewInstruction(option: Instruction) {
    // option id will need to be changed to null along with the query inject
    const newOption = { ...option, instruction: query };
    const createdOption = await handleInstruction.post(newOption);
    handleInstruction.addCreated(createdOption);
    handleSelected.updateSelected(createdOption, arrayKey);
    // handleInstructions.updateFilterKeys([arrayKey, createdOption.id]) WIP
    setSelected(createdOption);
  }

  /** Updates parent state with selected option */
  function processExistingInstruction(option: Instruction) {
    handleSelected.updateSelected(option, arrayKey); // P
    // handleInstructions.updateFilterKeys([arrayKey, option.id]) WIP
    setSelected(option);
  }

  /** Consolidates actions that deselect option */
  function processDeselect(selectedOption: Instruction) {
    // handleInstructions.removeFilterKey(arrayKey) WIP
    // selectedOption = null for pending creation of instructions.
    if (!selectedOption) return;
    // Only created instructions will trigger this action
    if (!isNewInstruction(selectedOption))
      handleSelected.removeSelected(arrayKey); // P
    setSelected(null);
  }

  /** Handles parent state update when changes are made to combobox */
  async function handleChange(option: Instruction) {
    // clears input when characters are deleted
    if (!option) return processDeselect(selected);
    isNewInstruction(option)
      ? processNewInstruction(option)
      : processExistingInstruction(option);
  }

  /** Consolidates actions taken when dropdown value is selected  */
  function onValueSelect(value: Instruction) {
    setQuery("");
    handleChange(value);
    scrollToElement("")
  }

  /** Facilitates if a created value or template value is rendered */
  function displayInitialValue(value: Instruction) {
    // don't do anything for null value
    if (!value) return;
    return value.id ? value : value.instruction;
  }

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
      setDropdownOpen(false);
      // if (
      //   wrapperRef.current &&
      //   !wrapperRef.current.contains(event.target as Node) &&
      //   dropdownRef.current &&
      //   !dropdownRef.current.contains(event.target as Node)
      // ) {
      //   setDropdownOpen(false);
      // }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <>
      <Combobox
        as="div"
        value={displayInitialValue(selected || { instruction: "", id: null })}
        onChange={onValueSelect}
      >
        <div ref={wrapperRef} className="relative mt-2">
          <ComboboxInput
            inputMode={isKbSuppressed ? "none" : undefined}
            placeholder={instruction.instruction}
            className="w-full rounded-md border-0 bg-accent py-1.5 placeholder:text-gray-500 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-light-border focus:ring-2 focus:ring-inset focus:ring-focus-color sm:text-sm sm:leading-6"
            onFocus={() => setIsKbSuppressed(false)}
            onSelect={() => setIsKbSuppressed(false)}
            onClick={() => setIsKbSuppressed(false)}
            onChange={(event) => {
              // recipeRequestRef.current?.scrollIntoView();
              event.preventDefault();
              setQuery(event.target.value);
            }}
            onBlur={() => setQuery("")}
            displayValue={(option: { instruction: string }) =>
              option.instruction
            }
          />
          <ComboboxButton
            onClick={(e) => {
              setIsKbSuppressed(true);
              setDropdownOpen(true);
            }}
            className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
          >
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>

          {
            // dropdownOpen &&
            //   filteredOptions.length > 0 &&
            createPortal(
              <ComboboxOptions
                ref={dropdownRef}
                id="InstructionsManager-Options"
                className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-accent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                style={{
                  top: dropdownPos.top,
                  left: dropdownPos.left,
                  width: dropdownPos.width,
                  position: "absolute",
                }}
              >
                {filteredOptions.map((option) => (
                  <ComboboxOption
                    onClick={() => setDropdownOpen(false)}
                    key={option.id}
                    value={option}
                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-selected data-[focus]:text-accent"
                  >
                    <span className="block truncate group-data-[selected]:font-semibold">
                      {option.instruction}
                    </span>

                    <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-accent">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>,
              document.body
            )
          }
        </div>
      </Combobox>
    </>
  );
}

export default InstructionManager;
