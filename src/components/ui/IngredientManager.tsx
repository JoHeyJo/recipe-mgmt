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
  const filteredOptions: Option[] =
    query === ''
      ? options
      : filterOptions();

  /** Filters options => all options / matching options / no match = create... */
  function filterOptions() {
    if (options.length === 0) {
      return [{ id: null, [name]: '+ create...' }];
    } else {
      return options.reduce<Option[]>((currentOptions, option) => {
        const isOptionAvailable = (option[name as keyof Option] as string).toLowerCase().includes(query.toLowerCase());
        console.log("inside here", currentOptions)
        if (isOptionAvailable) currentOptions.push(option);

        //renders "+ create" option if query value doesn't exist in the dropdown options
        if (currentOptions.length < 1 && !isOptionAvailable)
          currentOptions.push({ id: null, [name]: '+ create...' });
        return currentOptions;
      }, []);
    }
  }

  /** Handles parent state update when selection is made in combobox */
  async function handleChange(option: any) {
    console.log("option", option)
    if (option.id === null && option[name] === '+ create...') {
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
    <ComboboxDropdown name={name} handleQuery={setQuery} onValueSelect={onValueSelect} filteredOptions={filteredOptions} selected={selected} />
  )
}

export default IngredientManager;
