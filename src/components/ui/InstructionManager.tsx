import { useState, useEffect, ChangeEvent } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { Option, Instruction, Instructions } from '../../utils/types';
import ComboboxDropdown from './ComboboxDropdown';

function uniqueID() {
  return Math.random();
}

const unique: any = () => Math.random()

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

type InstructionManager = {
  index: number;
  name: string;
  handleOptionChange: (state: string, option: Option) => void;
  options: Instructions;
  handleAdd: (instruction: Instruction, index: number) => void;
  postRequest: (option: Option) => void;
  manageInstructions: any
}

/** InstructionManager - ring is removed 
 * 
 * Searches and filters existing options
 * 
 * InstructionsArea -> InstructionManager
 */

function InstructionManager({ index, name, handleOptionChange, options, handleAdd, postRequest, manageInstructions }: InstructionManager) {
  const [query, setQuery] = useState<string>('')
  const [selected, setSelected] = useState<Option>()

  /** Creates a list of filtered options based on search query */
  const filteredOptions =
    query === ''
      ? options
      : options.reduce<Instructions>((currentOptions, option) => {
        const isOptionAvailable = option.instruction.toLowerCase().includes(query.toLowerCase());
        if (isOptionAvailable) currentOptions.push(option);

        //renders "+ create" option if query value doesn't exist in the dropdown options
        if (currentOptions.length < 1 && !isOptionAvailable)
          currentOptions.push({ id: `create-${Math.random()}`, instruction: '+ create...' });
        return currentOptions;
      }, []);


  /** Handles parent state update when changes are made to combobox */
  function handleChange(option: any) {
    if (option.id.startsWith("create-") && option.instruction === '+ create...') {
      // create new input field when only one input field is left
      if (index === options.length - 2) manageInstructions.newInstructionInput()
      // new object needs to have query string injected as a value
      option.instruction = query;
      // option = postRequest(option);
      handleAdd(option, index)
    }
    setSelected(option);
  };

  /** Consolidates actions taken when dropdown value is selected  */
  function onValueSelect(value: Option) {
    setQuery('')
    handleChange(value)
  }

  /** Adds ingredient to parent component when an ingredient is selected  */
  useEffect(() => {
    selected && handleOptionChange(name, selected);
  }, [selected, options]);

  return (
    <>
      <ComboboxDropdown name={name} handleQuery={setQuery} onValueSelect={onValueSelect} filteredOptions={filteredOptions} selected={selected} />
    </>
  )
}

export default InstructionManager;