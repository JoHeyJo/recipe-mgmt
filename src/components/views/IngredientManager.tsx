import { useState, useRef, useEffect, useId } from "react";
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
import { createPortal } from "react-dom";
import { filterOptions } from "../../utils/functions";

/** IngredientManager - Searches and filters existing ingredient options - ring is removed
 *
 * Renders input field with capability to create new options.
 *
 * IngredientInputGroup -> IngredientManager
 *
 * Commit with all attempted handler variations for keyboard interactions
 * & useEffect to handle close on outside scroll and close on outside click -  b0a1cee
 *
 * Currently all data posted is type of string..
 */

function IngredientManager({
  length,
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const [isKbSuppressed, setIsKbSuppressed] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const stableId = useId();

  const isNewOption = (option: AttributeData) =>
    typeof option.id === "string" && option[attribute] === "+ create...";

  /** Creates a list of filtered options based on search query */
  const filteredOptions: AttributeData[] =
    query.trim() === ""
      ? options
      : filterOptions(query, options, attribute, stableId);

  /** Injects query string prior to POST request and updates parent state  */
  async function processNewOption(option: AttributeData) {
    typeCheckIngredientQuery();
    const newOption = { ...option, id: null, [attribute]: query };
    const createdOption = await handleOption.post(entity, newOption);
    handleOption.addCreated(entity, createdOption);
    handleComponent.updateSelected(entity, createdOption);
    setSelected(createdOption);
  }

  /** Updates parent state with selected option */
  function processExistingOption(option: AttributeData) {
    handleComponent.updateSelected(entity, option);
    setSelected(option);
  }

  /** Consolidates actions that deselect option */
  function processDeselect() {
    handleComponent.removeSelected(entity);
    setSelected(null);
    // setDropdownOpen(false);
    console.log("deselected value:","isdropdown open:",dropdownOpen)
  }
  // When input is deleted dropdown is closed - I think I need this
  // When value is entered dropdown is open

  // when input is deleted leave dropdown as open 
  // when value is entered dropdown is already open
  // this does not match combobox's internal state

  /** Handles parent state update when selection is made in combobox */
  function updateOnSelect(option: any) {
    if (!option) return processDeselect();

    isNewOption(option)
      ? processNewOption(option)
      : processExistingOption(option);
  }

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

  /** Consolidates actions taken when dropdown value is selected  */
  function onValueSelect(value: any) {
    console.log("isDropDownOpen:",dropdownOpen)
    // inputRef.current?.blur() // consider implementing this for friendly accessibility
    setIsKbSuppressed(true);
    setQuery("");
    updateOnSelect(value);
    // setDropdownOpen(false);
  }

  // Update dropdown position: Dependencies track potential change in dropdown position
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
  }, [dropdownOpen, selected, length]);

  // Close on scroll *outside* dropdown - necessary to auto close dropdown when scrolling outside dropdown
  useEffect(() => {
    if (!dropdownOpen) return;

    const closeOnScroll = (event: Event) => {
      const target = event.target as HTMLElement;

      const isInsideDropdown = dropdownRef.current?.contains(target);
      const isInsideCombobox = wrapperRef.current?.contains(target);

      if (isInsideDropdown === false && !isInsideCombobox) {
        console.log("isInsideDropdown:", isInsideDropdown);
        console.log("isInsideCombobox:", isInsideCombobox);
        console.log("setting to FALSE");
        // setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", closeOnScroll, true);
    return () => {
      window.removeEventListener("scroll", closeOnScroll, true);
    };
  }, [dropdownOpen]);

  return (
    <Combobox as="div" value={selected || ""} onChange={onValueSelect}>
      {/* <Alert alert={"error"} degree={"yellow"} /> */}
      <div ref={wrapperRef} className="relative mt-2">
        <ComboboxInput
          // required={entity === "item" ? true : false}
          ref={inputRef}
          inputMode={isKbSuppressed ? "none" : undefined}
          placeholder={placeholder}
          className="w-full rounded-md border-0 bg-accent py-1.5 placeholder:text-gray-500 text-gray-900 shadow-sm ring-1 ring-inset ring-light-border focus:ring-2 focus:ring-inset focus:ring-focus-color sm:text-sm sm:leading-6"
          onFocus={() => {
            // prevents modal from being pushed under keyboard on key input
            setDropdownOpen(true);
          }}
          onClick={(e) => {
            setIsKbSuppressed(false);
            setDropdownOpen(true);
            // scrollToElement(dialogPanelRef, 40); // clicking on input causes position to jump up and down
          }}
          onChange={(event) => {
            // event.preventDefault();
            console.log("typeing:", dropdownOpen);
            setQuery(event.target.value);
          }}
          onBlur={() => {
            setQuery("");
            setDropdownOpen(false);
          }}
          displayValue={(option: { [key: string]: string }) =>
            option?.[attribute]
          }
        />
        <ComboboxButton
          onClick={() => {
            setIsKbSuppressed(true);
            setDropdownOpen(true);
          }}
          className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
        >
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
            // onClick={() => {
            //   setDropdownOpen(true);
            // }}
          />
        </ComboboxButton>

        {dropdownOpen &&
          createPortal(
            <ComboboxOptions
              ref={dropdownRef}
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-accent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              style={{
                top: dropdownPos.top,
                left: dropdownPos.left,
                width: dropdownPos.width,
                position: "absolute",
              }}
            >
              {filteredOptions.map((option) => (
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
              ))}
            </ComboboxOptions>,
            document.body
          )}
      </div>
    </Combobox>
  );
}

export default IngredientManager;
