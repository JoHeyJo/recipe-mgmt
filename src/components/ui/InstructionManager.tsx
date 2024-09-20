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
  arrayKey: number;
  name: string;
  // handleOptionChange: (state: string, option: Instruction) => void;
  handleOptionChange: any
  options: Instructions;
  manageInstructions: any
}

/** InstructionManager - ring is removed 
 * 
 * Searches and filters existing options
 * 
 * InstructionsArea -> InstructionManager -> ComboboxDropdown
 */

function InstructionManager({ arrayKey, name, handleOptionChange, options, manageInstructions }: InstructionManager) {
  const [query, setQuery] = useState<string>('')
  const [selected, setSelected] = useState<Instruction>()
  console.log(arrayKey, options.length - 2)

  if (arrayKey === options.length - 2) manageInstructions.createInstructionInput()



  /** Creates a list of filtered options based on search query */
  const filteredOptions: Instruction[] =
    query === ''
      ? options
      : filterOptions();

  /** Filters options => all options / matching options / no match or no options = create... */
  function filterOptions() {
    if (options.length === 0) {
      return [{ id: `create-${Math.random()}`, instruction: '+ create...' }];
    } else {
      return options.reduce<Instruction[]>((currentOptions, option) => {
        const isOptionAvailable = option.instruction.toLowerCase().includes(query.toLowerCase());
        if (isOptionAvailable) currentOptions.push(option);
        //renders "+ create" option if query value doesn't exist in the dropdown options
        if (currentOptions.length < 1 && !isOptionAvailable)
          currentOptions.push({ id: `create-${Math.random()}`, instruction: '+ create...' });
        return currentOptions;
      }, []);
    }
  }

  /** Handles parent state update when changes are made to combobox */
  async function handleChange(option: any) {
    if (typeof option.id === "string" && option.instruction === '+ create...') {
      // create new input field when only one input field is left
      // new object needs to have query string injected as a value«
      const newOption = { ...option, instruction: query };
      const createdOption = await manageInstructions.postIngredient(newOption);
      manageInstructions.handleSelected(createdOption)
      setSelected(createdOption);
    } else {
      // manageInstructions.updateInstructionSelection(option, index)
      // passing filters keys in array to later be constructed as key value pair
      manageInstructions.handleSelected(option, [arrayKey, option.id])
      setSelected(option)
    }
  };

  /** Consolidates actions taken when dropdown value is selected  */
  function onValueSelect(value: any) {
    if (arrayKey === options.length - 2) manageInstructions.createInstructionInput()
    setQuery('')
    handleChange(value)
  }

  /** Adds ingredient to parent component when an ingredient is selected  */
  useEffect(() => {
    selected && handleOptionChange(name, selected);
  }, [selected]);

  return (
    <>
      <ComboboxDropdown name={name} handleQuery={setQuery} onValueSelect={onValueSelect} filteredOptions={filteredOptions} selected={selected} />
    </>
  )
}

export default InstructionManager;