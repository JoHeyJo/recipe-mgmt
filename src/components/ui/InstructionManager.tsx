import { useState, useEffect, ChangeEvent } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { Option, Instruction, Instructions } from '../../utils/types';

function uniqueID() {
  return Math.random();
}

const unique: any = () => Math.random()

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const placeHolder = ["Add ingredients...", "Add ice...", "shake..."]

type InstructionManager = {
  index: number;
  name: string;
  handleOptionChange: (state: string, option: Option) => void;
  options: Instructions;
  handleAdd: (instruction: Instruction, index: number) => void;
  postRequest: (option: Option) => void;
}

/** InstructionManager - ring is removed 
 * 
 * Renders Input field and dropdown menu. Searches and filters existing options
 * 
 * OptionWithSearch -> InstructionManager
 */

function InstructionManager({ index, name, handleOptionChange, options, handleAdd, postRequest }: InstructionManager) {
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
          currentOptions.push({ id: null, instruction: '+ create...' });
        return currentOptions;
      }, []);


  /** Handles parent state update when changes are made to combobox */
  async function handleChange(option: any) {
    console.log("option in handleChange", option)
    if (option.id === null && option.instruction === '+ create...') {
      // new object needs to have query string injected as a value
      option.instruction = query;
      // option = postRequest(option);
      console.log("option in handleChange conditional", option)
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
    <Combobox as="div" value={selected}
      onChange={(value) => {
        onValueSelect(value)
      }}>
      {/* <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Combobox.Label> */}
      <div className="relative">
        <Combobox.Input
          placeholder={name}
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
          displayValue={(displayValue: any) => {
            console.log(displayValue)
            return displayValue?.instruction}}
          // onBlur={() => setQuery('')}
          name={name as string}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredOptions.length > 0 && (
          <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <Combobox.Option
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
  )
}

export default InstructionManager;