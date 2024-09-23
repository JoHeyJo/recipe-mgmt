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
      <Combobox onChange={() => setQuery("")} as="div" value={selected || ""}>
        {/* <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Combobox.Label> */}
        <div className="relative">
          <Combobox.Input
            onBlur={() => setQuery('')}
            placeholder={name}
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(event: ChangeEvent<HTMLInputElement>) => 
             ( console.log(event.target.value),
              setQuery(event.target.value) )
            }
            displayValue={(instruction: { instruction: string }) => instruction?.instruction}
            name={name as string}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>

          {filteredOptions.length > 0 && (
            <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto">
              {filteredOptions.map((option, index) => (
                <Combobox.Option
                  onClick={() => onValueSelect(option)}
                  key={option.id}
                  value={option}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span className={classNames('block truncate', selected && 'font-semibold')}>{option.instruction}</span>

                      {selected && (
                        <span
                          className={classNames(
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-white' : 'text-indigo-600'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </>
  )
}

export default InstructionManager;