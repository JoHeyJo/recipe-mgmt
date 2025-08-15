import { useState, useRef, useEffect } from "react";
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
import { scrollToElement } from "../../utils/functions";
import { useContext } from "react";
import { ReferenceContext } from "../../context/ReferenceContext";

/** IngredientManager - Searches and filters existing ingredient options - ring is removed
 *
 * Renders input field with capability to create new options.
 *
 * IngredientInputGroup -> IngredientManager
 */

function IngredientManager({
  value,
  attribute,
  entity,
  options,
  handleOption,
  handleComponent,
}: IngredientManagerProps) {
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<AttributeData>(value);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const [isKbSuppressed, setIsKbSuppressed] = useState(false);

  const { dialogPanelRef } = useContext(ReferenceContext);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isNewOption = (option: AttributeData) =>
    typeof option.id === "string" && option[attribute] === "+ create...";

  /** Creates a list of filtered options based on search query */
  const filteredOptions: AttributeData[] =
    query === "" ? options : filterOptions();

  /** Filters options => all options / matching options / no match = create... */
  function filterOptions() {
    if (options.length === 0) {
      return [{ id: `create-${Math.random()}`, [attribute]: "+ create..." }];
    } else {
      return options.reduce<AttributeData[]>((currentOptions, option) => {
        const isOptionAvailable = (
          option[attribute as keyof AttributeData] as string
        )
          .toLowerCase()
          .includes(query.toLowerCase());
        if (isOptionAvailable) currentOptions.push(option);

        //renders "+ create" option if query value doesn't exist in the dropdown options
        if (currentOptions.length < 1 && !isOptionAvailable)
          currentOptions.push({
            id: `create-${Math.random()}`,
            [attribute]: "+ create...",
          });
        return currentOptions;
      }, []);
    }
  }

  /** Injects query string prior to POST request and updates parent state  */
  async function processNewOption(option: AttributeData) {
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
  }

  /** Handles parent state update when selection is made in combobox */
  function updateOnSelect(option: any) {
    if (!option) return processDeselect();
    isNewOption(option)
      ? processNewOption(option)
      : processExistingOption(option);
  }

  /** Consolidates actions taken when dropdown value is selected  */
  function onValueSelect(value: any) {
    // inputRef.current?.blur() // consider implementing this for friendly accessibility 
    setIsKbSuppressed(true);
    scrollToElement(dialogPanelRef);
    setQuery("");
    updateOnSelect(value);
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
    console.log("dropdown is open:", dropdownOpen)

    const handleClickOutside = (event: MouseEvent) => {
      console.log("window click")
      setDropdownOpen(false);
      setIsKbSuppressed(true);
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

  // useEffect(()=>{
  //   scrollToElement(dialogPanelRef)
  // },[isKbSuppressed])

  return (
    <Combobox as="div" value={selected || ""} onChange={onValueSelect}>
      <div ref={wrapperRef} className="relative mt-2">
        <ComboboxInput
          ref={inputRef}
          inputMode={isKbSuppressed ? "none" : undefined}
          placeholder={entity}
          className="w-full rounded-md border-0 bg-accent py-1.5 placeholder:text-gray-500 text-gray-900 shadow-sm ring-1 ring-inset ring-light-border focus:ring-2 focus:ring-inset focus:ring-focus-color sm:text-sm sm:leading-6"
          onFocus={() => {
            /* 
            setDropdownOpen(true) 
            pro: prevents dialog panel from being pushed under keyboard when typing starts
            con: on input focus window scroll jumps  
            */
          //  setDropdownOpen(true);
            //  scrollToElement(dialogPanelRef, 50);
            // setIsKbSuppressed(false);
          }}
          // onSelect={() => setIsKbSuppressed(false)}
          onClick={(e) => {
            //scrollToElement(dialogPanelRef, 50);
            // Pro: necessary for element to scroll into place whe dropdown is open and keyboard is opens on input click
            // Con: scroll to jumps between two points
            scrollToElement(dialogPanelRef, 50);
            // setIsKbSuppressed(false);
            /* 
            prevents modal from jumping under keyboard on user input - this 
            still does not automatically open dropdown on click, user input 
            is necessary 
             */
            setDropdownOpen(true);
          }}
          onInput={(e)=>{
            // e.preventDefault()
            // e.stopPropagation()
            // setDropdownOpen(true);
          }}
          onChange={(event) => {
            event.preventDefault();
            setQuery(event.target.value);
            // ensures dropdown is shown on user input - does NOT cause modal to hide under keyboard on input
            setDropdownOpen(true);
          }}
          onBlur={() => setQuery("")}
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
          />
        </ComboboxButton>

        {createPortal(
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
