
import { useState, useEffect, ChangeEvent } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { Instruction } from '../../utils/types';
import { InstructionManagerProps } from '../../utils/props';


/** InstructionManager - renders instructions - ring is removed 
 * 
 * NOTES TO BE ADDRESSED
 * 
 * Searches and filters existing options
 * 
 * InstructionsArea -> InstructionManager
 */

function InstructionManager({ arrayKey, instruction, options, handleInstructions }: InstructionManagerProps) {
  const [query, setQuery] = useState<string>('')
  const [selected, setSelected] = useState<Instruction>(instruction)

  const IS_NEW_INSTRUCTION = (option: Instruction) => typeof option.id === "string" && option.instruction === '+ create...'

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
    const createdOption = await handleInstructions.addInstruction(newOption);
    handleInstructions.addToInstructionState(createdOption)
    handleInstructions.updateFilterKeys([arrayKey, createdOption.id])
    // handleInstructions.updateInstructionSelection(createdOption, arrayKey) // association already happens when new instruction is procesesd
    setSelected(createdOption);
  }

  /** Updates parent state with selected option*/
  function processExistingInstruction(option: Instruction) {
    handleInstructions.updateInstructionSelection(option, arrayKey) // Does this need to be here? Do an exisiting instruciton need to be added to parent state?
    handleInstructions.updateFilterKeys([arrayKey, option.id])
    setSelected(option)
  }

  /** Consolidates actions that deselect option */
  function processDeselect(option: Instruction) {
    handleInstructions.removeFilterKey(arrayKey)
    // option = undefined for pending instructions. Will break without this check
    // Only created instructions will trigger this action
    if (option) handleInstructions.removeInstructionSelection(option.id)
    setSelected(null)
  }

  /** Handles parent state update when changes are made to combobox */
  async function handleChange(option: Instruction) {
    // clears input when characters are deleted
    if (!option) return processDeselect(selected)

    IS_NEW_INSTRUCTION(option) ? processNewInstruction(option) : processExistingInstruction(option)
  };

  /** Consolidates actions taken when dropdown value is selected  */
  function onValueSelect(value: any) {
    setQuery('')
    handleChange(value)
  }

  /** Adds instruction to parent component when an instruction is selected 
   * WHY IS THIS NOT NEEDED HERE BUT NEEDED IN INGREDIENTMANAGER 
   * ######## CONSIDER REMOVING HAS NO PURPOSE ########
   */
  // useEffect(() => {
  //   selected && handleOptionChange(instruction.instruction, selected);
  // }, [selected]);

  return (
    <>
      <Combobox
        as="div"
        value={selected || { id: null, instruction: '' }}
        onChange={onValueSelect}
      >
        <div className="relative mt-2">
          <ComboboxInput
            placeholder={"something"}
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(event) => setQuery(event.target.value)}
            onBlur={() => setQuery('')}
            displayValue={(option: { instruction: string }) => option?.instruction}
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
