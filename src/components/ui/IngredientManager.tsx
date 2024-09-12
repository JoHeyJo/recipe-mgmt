import { useState, useEffect, ChangeEvent } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { Option } from '../../utils/types';
import ComboboxDropdown from './ComboboxDropdown';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

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
  const filteredOptions =
    query === ''
      ? options
      : dropDownSelection(options, query, name)

  function dropDownSelection(options: Option[], query: string, name: string) {
    if (options.length === 0) {
      // Return the "+ create..." option if no options exist
      return [{ id: null, [name]: '+ create...' }];
    } else {
      // Filter options based on query and handle the "+ create" option if no match is found
      const filteredOptions = options.reduce<Option[]>((currentOptions, option) => {
        console.log("option", option)
        const isOptionAvailable = (option[name as keyof Option] as string)
          .toLowerCase()
          .includes(query.toLowerCase());

        // If the option matches the query, add it to the filtered options
        if (isOptionAvailable) currentOptions.push(option);
        // If no options match the query, add a "+ create..." option
        if (filteredOptions.length === 0)
          filteredOptions.push({ id: null, [name]: '+ create...' });

        return currentOptions;
      }, []);

      return filteredOptions;
    }
  }

  /** Handles parent state update when changes are made to combobox */
  function handleChange(option: any) {
    console.log("option", option)
    if (option.id === null && option[name] === '+ create...') {
      // new object needs to have query string injected as a value
      option[name] = query;
      option = postRequest(option);
      console.log("handle change",option)
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
    <ComboboxDropdown name={name} handleQuery={setQuery} onValueSelect={onValueSelect} filteredOptions={filteredOptions} selected={selected} />
  )
}

export default IngredientManager;
