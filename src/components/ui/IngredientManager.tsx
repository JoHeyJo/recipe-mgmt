import { useState, useEffect, ChangeEvent } from 'react'
import { Option } from '../../utils/types';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

type IngredientManager = {
  name: string
  handleOptionChange: (state: string, option: Option) => void;
  options: Option[];
  handleAdd: (state: string, option: Option) => void
  postRequest: (option: Option) => void;
}

/** IngredientManager - ring is removed 
 * 
 * Searches and filters existing ingredient options
 * 
 * OptionDropdown -> IngredientManager
 */

function IngredientManager({ name, handleOptionChange, options, handleAdd, postRequest }: IngredientManager) {
  const [query, setQuery] = useState<string>('')
  const [selected, setSelected] = useState<Option>()

  /** Creates a list of filtered options based on search query */
  const filteredOptions: Option[] =
    query === ''
      ? options
      : filterOptions();

  /** Filters options => all options / matching options / no match = create... */
  function filterOptions() {
    if (options.length === 0) {
      return [{ id: `create-${Math.random()}`, [name]: '+ create...' }];
    } else {
      return options.reduce<Option[]>((currentOptions, option) => {
        const isOptionAvailable = (option[name as keyof Option] as string).toLowerCase().includes(query.toLowerCase());
        if (isOptionAvailable) currentOptions.push(option);

        //renders "+ create" option if query value doesn't exist in the dropdown options
        if (currentOptions.length < 1 && !isOptionAvailable)
          currentOptions.push({ id: `create-${Math.random()}`, [name]: '+ create...' });
        return currentOptions;
      }, []);
    }
  }

  /** Handles parent state update when selection is made in combobox */
  async function handleChange(option: any) {
    console.log("option", option)
    if (option.id.startsWith("create-") && option[name] === '+ create...') {
      // new object needs to have query string injected as a value
      option[name] = query;
      option = await postRequest(option);
      console.log("handle change", option)
      handleAdd(name, option)
    }
    setSelected(option);
  };

  /** Consolidates actions taken when dropdown value is selected  */
  function onValueSelect(value: any) {
    console.log("onValueSelect", value)
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
      value={selected}
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
