import { useState, useEffect, useRef, useId } from "react";
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
import { scrollIntoViewElement, filterOptions } from "../../utils/functions";

/**
 * InstructionManager — searchable / creatable instruction picker.
 *
 * Open state and positioning are owned by Headless UI:
 *  - `immediate`  opens the option list on focus
 *  - `anchor`     portals + repositions the list (floating-ui) on scroll/resize/flip
 *  - `onClose`    clears the search query whenever the list closes
 *
 * InstructionsArea -> InstructionManager
 */
function InstructionManager({
  numOfInstruction,
  arrayKey,
  instruction,
  options,
  handleSelected,
  handleInstruction,
}: InstructionManagerProps) {
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<Instruction>(instruction);
  const [isKbSuppressed, setIsKbSuppressed] = useState(false);

  const instructionRef = useRef<HTMLDivElement>(null);
  const stableId = useId();
console.log("options.......",options);
  /** Options filtered by the current search query. */
  const filteredOptions =
    query.trim() === ""
      ? options
      : filterOptions(query, options, "instruction", stableId);

  const isNewInstruction = (option: Instruction) =>
    typeof option.id === "string" && option.instruction === "+ create...";

  /** Injects the query into the POST body, then updates parent + local state. */
  async function processNewInstruction(option: Instruction) {
    const newOption = { ...option, instruction: query };
    const createdOption = await handleInstruction.post(newOption);
    handleInstruction.addCreated(createdOption);
    handleSelected.updateSelected(createdOption, arrayKey);
    setSelected(createdOption);
  }

  /** Updates parent + local state with an existing option. */
  function processExistingInstruction(option: Instruction) {
    handleSelected.updateSelected(option, arrayKey);
    setSelected(option);
  }

  /** Clears the selection in parent + local state. */
  function processDeselect() {
    handleSelected.removeSelected(arrayKey);
    setSelected(null);
  }

  /** Routes a combobox change to the correct handler. */
  function onValueSelect(option: Instruction | null) {
    setIsKbSuppressed(true);
    if (!option) return processDeselect();
    isNewInstruction(option)
      ? processNewInstruction(option)
      : processExistingInstruction(option);
  }

  // Bring a newly added row into view once the list gets long.
  useEffect(() => {
    if (numOfInstruction > 4) scrollIntoViewElement(instructionRef);
  }, [numOfInstruction]);
console.log("filteredOptions:", filteredOptions.instructions);
  return (
    <Combobox
      ref={instructionRef}
      as="div"
      id="InstructionsManger-instruction"
      immediate
      value={selected}
      onChange={onValueSelect}
      onClose={() => setQuery("")}
    >
      <div className="relative mt-2">
        <ComboboxInput
          inputMode={isKbSuppressed ? "none" : undefined}
          placeholder={!instruction.id && instruction.instruction}
          className="w-full rounded-md border-0 bg-accent py-1.5 placeholder:text-gray-500 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-light-border focus:ring-2 focus:ring-inset focus:ring-focus-color sm:text-sm sm:leading-6"
          onClick={() => setIsKbSuppressed(false)}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(option: any) =>
            option.id && option.instruction
          }
        />

        <ComboboxButton
          onClick={() => setIsKbSuppressed(true)}
          className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
        >
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </ComboboxButton>

        <ComboboxOptions
          id="InstructionsManager-Options"
          anchor="bottom start"
          className="z-50 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-accent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 [--anchor-gap:4px] focus:outline-none sm:text-sm"
        >
          {filteredOptions.length === 0 ? (
            <div className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-500">
              Nothing found.
            </div>
          ) : (
            filteredOptions.map((option) => (
              <ComboboxOption
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
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}

export default InstructionManager;
