
import { useState, useEffect } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { Instruction } from '../../utils/types';
import { InstructionManagerProps } from '../../utils/props';


/** InstructionManager - renders instructions - ring is removed 
 * 
 * Searches and filters existing instructions
 * 
 * InstructionsArea -> InstructionManager
 */

function InstructionManager({ arrayKey, instruction, options, handleSelected, handleInstruction }: InstructionManagerProps) {
  const [query, setQuery] = useState<string>('')
  const [selected, setSelected] = useState<Instruction>(instruction)

  const isNewInstruction = (option: Instruction) => typeof option.id === "string" && option.instruction === '+ create...'

  useEffect(() => {
    setSelected(instruction)
  }, [])

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

  /** Injects query string prior to POST request and updates parent state  */
  async function processNewInstruction(option: Instruction) {
    // option id will need to be changed to null along with the query inject
    const newOption = { ...option, instruction: query };
    const createdOption = await handleInstruction.post(newOption);
    handleInstruction.addCreated(createdOption)
    handleSelected.updateSelected(createdOption, arrayKey)
    // handleInstructions.updateFilterKeys([arrayKey, createdOption.id]) WIP 
    setSelected(createdOption);
  }

  /** Updates parent state with selected option */
  function processExistingInstruction(option: Instruction) {
    handleSelected.updateSelected(option, arrayKey) // P
    // handleInstructions.updateFilterKeys([arrayKey, option.id]) WIP
    setSelected(option)
  }

  /** Consolidates actions that deselect option */
  function processDeselect(selectedOption: Instruction) {
    // handleInstructions.removeFilterKey(arrayKey) WIP
    // selectedOption = null for pending creation of instructions.
    if (!selectedOption) return
    // Only created instructions will trigger this action
    if (!isNewInstruction(selectedOption)) handleSelected.removeSelected(arrayKey) // P
    setSelected(null)
  }

  /** Handles parent state update when changes are made to combobox */
  async function handleChange(option: Instruction) {
    // clears input when characters are deleted
    if (!option) return processDeselect(selected)
    isNewInstruction(option) ? processNewInstruction(option) : processExistingInstruction(option)
  };

  /** Consolidates actions taken when dropdown value is selected  */
  function onValueSelect(value: Instruction) {
    setQuery('')
    handleChange(value)
  }

  /** Facilitates if a created value or template value is rendered */
  function displayInitialValue(value: Instruction) {
    // don't do anything for null value
    if (!value) return
    return value.id ? value : value.instruction;
  }

  return (
    <>
      <Combobox
        as="div"
        value={displayInitialValue(selected || { instruction: '', id: null })}
        onChange={onValueSelect}
      >
        <div className="relative mt-2">
          <ComboboxInput
            placeholder={instruction.instruction}
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(event) => setQuery(event.target.value)}
            onBlur={() => setQuery('')}
            displayValue={(option: { instruction: string }) => option.instruction}
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
                  <span className="block truncate group-data-[selected]:font-semibold">{option.instruction}</span>

                  <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
    </>
  )
}

export default InstructionManager;
