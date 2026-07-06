import { useState, useId } from "react";
import { AttributeData } from "../../utils/types";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { IngredientManagerProps } from "../../utils/props";
import { filterOptions } from "../../utils/functions";

/**
 * IngredientManager — searchable / creatable option picker for a single ingredient field.
 *
 * Open state and positioning are owned by Headless UI:
 *  - `immediate`  opens the option list on focus
 *  - `anchor`     portals + repositions the list (floating-ui) on scroll/resize/flip
 *  - `onClose`    clears the search query whenever the list closes
 *
 * IngredientInputGroup -> IngredientManager
 *
 * NOTE: handleOption should be renamed to optionAction.
 * NOTE: all data is currently posted as a string.
 */
function IngredientManager({
  value,
  attribute,
  entity,
  options,
  handleOption,
  handleComponent,
  placeholder,
}: IngredientManagerProps) {
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<AttributeData>(value);
  const [isKbSuppressed, setIsKbSuppressed] = useState(false);

  const stableId = useId();

  const isNewOption = (option: AttributeData) =>
    typeof option.id === "string" && option[attribute] === "+ create...";

  /** Options filtered by the current search query. */
  const filteredOptions: AttributeData[] =
    query.trim() === ""
      ? options
      : filterOptions(query, options, attribute, stableId);

  /** Injects the query into the POST body, then updates parent + local state. */
  async function processNewOption(option: AttributeData) {
    typeCheckIngredientQuery();
    const newOption = { ...option, id: null, [attribute]: query };
    const createdOption = await handleOption.post(entity, newOption);
    handleOption.addCreated(entity, createdOption);
    handleComponent.updateSelected(entity, createdOption);
    setSelected(createdOption);
  }

  /** Updates parent + local state with an existing option. */
  function processExistingOption(option: AttributeData) {
    handleComponent.updateSelected(entity, option);
    setSelected(option);
  }

  /** Clears the selection in parent + local state. */
  function processDeselect() {
    handleComponent.removeSelected(entity);
    setSelected(null);
  }

  /** Routes a combobox change to the correct handler. */
  function updateOnSelect(option: AttributeData | null) {
    if (!option) return processDeselect();
    isNewOption(option)
      ? processNewOption(option)
      : processExistingOption(option);
  }

  /** Validates the query against the entity type before a create. */
  function typeCheckIngredientQuery() {
    try {
      if (entity === "amount") {
        const isNaN = +query;
        if (Number.isNaN(isNaN))
          throw {
            message: `Numbers only. Amount value "${query}", not valid.`,
          };
      }
      if (entity === "unit") {
        const isNaN = +query;
        if (!Number.isNaN(isNaN)) {
          throw { message: `No numbers. Unit value "${query}", not valid.` };
        }
      }
      if (entity === "item") {
        const isNaN = +query;
        if (!Number.isNaN(isNaN)) {
          throw { message: `No numbers. Name value "${query}", not valid.` };
        }
      }
    } catch (error) {
      handleComponent.handleError(error.message);
    }
  }

  /** Consolidates actions taken when a dropdown value is selected. */
  function onValueSelect(option: AttributeData | null) {
    setIsKbSuppressed(true);
    updateOnSelect(option);
  }

  return (
    <Combobox
      as="div"
      immediate
      value={selected}
      onChange={onValueSelect}
      onClose={() => setQuery("")}
    >
      {/* <Alert alert={"error"} degree={"yellow"} /> */}
      <div className="relative mt-2">
        <ComboboxInput
          inputMode={isKbSuppressed ? "none" : undefined}
          placeholder={placeholder}
          className="w-full rounded-md border-0 bg-accent py-1.5 placeholder:text-gray-500 text-gray-900 shadow-sm ring-1 ring-inset ring-light-border focus:ring-2 focus:ring-inset focus:ring-focus-color sm:text-sm sm:leading-6"
          onClick={() => setIsKbSuppressed(false)}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(option: AttributeData | null) =>
            option?.[attribute] ?? ""
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
                  {option[attribute]}
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

export default IngredientManager;
