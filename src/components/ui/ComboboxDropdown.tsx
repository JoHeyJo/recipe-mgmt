import { ChangeEvent } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { Option, Instruction, Manager } from '../../utils/types';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

function uniqueID() {
  return Math.random();
}

const unique: any = () => Math.random()

type ComboBoxDropDown = {
  handleQuery: any;
  // onValueSelect: ((value: Instruction) => void) | ((value: Option) => void)
  onValueSelect: any
  filteredOptions: any[];
  selected?: Option | Instruction;
  name: string
}

/** ComboBoxDropdown
 * 
 * Renders Input field and dropdown menu. 
 * 
 * [InstructionManager, IngredientManager] -> ComboboxDropdown
 */
function ComboboxDropdown({ name, handleQuery, onValueSelect, filteredOptions, selected }: ComboBoxDropDown) {
// console.log("selected",selected)
//   const handleSelect = (value: any) => {
//     // Type narrowing with 'in' operator
//     if ('instruction' in value) {
//       // Now TypeScript knows `value` is of type `Instruction`
//       (onValueSelect as (value: Instruction | string) => void)(value);
//     } else {
//       // Now TypeScript knows `value` is of type `Option`
//       (onValueSelect as (value: Option | string) => void)(value);
//     }
//   };

  return (
    <Combobox as="div" value={selected || ""}
      onChange={(value) => {
        // handleSelect(value)
        onValueSelect(value)
      }}>
      {/* <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Combobox.Label> */}
      <div className="relative">
        <Combobox.Input
          placeholder={name}
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event: ChangeEvent<HTMLInputElement>) => handleQuery(event.target.value)}
          // displayValue={(displayValue: { [key: string]: string }) => displayValue?.[name]}
          displayValue={(displayValue: { [key: string]: string }) => {
            return displayValue?.[name] ? displayValue?.[name] : displayValue?.instruction
          }}
          // onBlur={() => handleQuery('')}
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
                    {option.instruction
                      ? <span className={classNames('block truncate', selected && 'font-semibold')}>{option.instruction}</span>
                      : <span className={classNames('block truncate', selected && 'font-semibold')}>{option[name as keyof Option]}</span>
                    }

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

export default ComboboxDropdown