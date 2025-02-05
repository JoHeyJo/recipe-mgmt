import { useState, useEffect, ChangeEvent } from 'react'
import { Attribute } from '../../utils/types'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

type IngredientManager = {
  value: Attribute;
  name: string
  handleOptionChange: (state: string, option: Attribute) => void;
  options: Attribute[];
  postRequest: (option: Attribute) => Promise<Attribute>;
  handleOptions: any
}

/** IngredientManager - ring is removed 
 * 
 * Searches and filters existing ingredient options
 * Renders input field with capability to create new options.
 * 
 * OptionRequests -> IngredientManager
 */

function IngredientManager({ value, name, handleOptionChange, options, postRequest, handleOptions }: IngredientManager) {
  const [query, setQuery] = useState<string>('')
  const [selected, setSelected] = useState<Attribute>(value)
//SHOULD REQUESTS AND STATE MANAGMENT BE SPLIT INTO TWO OBJECTS eg handleOptions & optionRequest....
  const isNewOption = (option: Attribute) => typeof option.id === "string" && option[name] === '+ create...'

  /** Creates a list of filtered options based on search query */
  const filteredOptions: Attribute[] =
    query === ''
      ? options
      : filterOptions();

  /** Filters options => all options / matching options / no match = create... */
  function filterOptions() {
    if (options.length === 0) {
      return [{ id: `create-${Math.random()}`, [name]: '+ create...' }];
    } else {
      return options.reduce<Attribute[]>((currentOptions, option) => {
        const isOptionAvailable = (option[name as keyof Attribute] as string).toLowerCase().includes(query.toLowerCase());
        if (isOptionAvailable) currentOptions.push(option);

        //renders "+ create" option if query value doesn't exist in the dropdown options
        if (currentOptions.length < 1 && !isOptionAvailable)
          currentOptions.push({ id: `create-${Math.random()}`, [name]: '+ create...' });
        return currentOptions;
      }, []);
    }
  }

  /** Injects query string prior to POST request and updates parent state  */
  async function processNewOption(option: Attribute) {
    const newOption = { ...option, id: null, [name]: query }
    const createdOption = await postRequest(newOption);
    handleOptions.addOption(name, createdOption)
    setSelected(createdOption);
  }

  /** Updates parent state with selected option*/
  function processExistingOption(option: Attribute) {
    setSelected(option);
  }

  /** Consolidates actions that deselect option */
  function processDeselect() {
    handleOptions.removeDeselected(name)
    setSelected(null)
  }

  /** Handles parent state update when selection is made in combobox */
  function handleChange(option: any) {
    if (!option) return processDeselect();
    isNewOption(option) ? processNewOption(option) : processExistingOption(option)
  }

  /** Consolidates actions taken when dropdown value is selected  */
  function onValueSelect(value: any) {
    setQuery('')
    handleChange(value)
  }

  /** Adds ingredient to parent component when an ingredient is selected  */
  useEffect(() => {
    selected && handleOptionChange(name, selected);
  }, [selected, options]);

  return (
    <Combobox
      as="div"
      value={selected || ""}
      onChange={onValueSelect}>
      <div className="relative mt-2">
        <ComboboxInput
          placeholder={name}
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery('')}
          displayValue={(option: { [key: string]: string }) => option?.[name]}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>

        {filteredOptions.length > 0 && (
          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <ComboboxOption
                key={option.id}
                value={option}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                <span className="block truncate group-data-[selected]:font-semibold">{option[name]}</span>

                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  )
}

export default IngredientManager;
