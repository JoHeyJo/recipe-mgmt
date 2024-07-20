import { useState, useEffect } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

type Option = {
  id: number;
} & {
  [key: string]: string;
};


type DropDownWithSearchProp = {
  name: string;
  addIngredient: (event: any) => void;
  options: any[];
  // onSelect: (option: DropdownOption) => void;
}

/** Combobox component - ring is removed 
 * 
 * IngredientInputGroup -> DropDownWithSearch
 */

function DropDownWithSearch({ name, addIngredient, options }: DropDownWithSearchProp) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  let filteredOptions = undefined; 
  console.log(name,options)

  if (name === "liquid") {
    filteredOptions =
      query === ''
        ? options
        : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase())
        })

  } else {
    filteredOptions =
      query === ''
        ? options
        : options.filter((option) => {
          return option.name.includes(query)
        })
  }

  useEffect(() => {
    addIngredient(selected);
  }, [selected]);
  // selected = {id: 3, name: '1 / 3'}

  return (
    <Combobox as="div" value={selected}
      onChange={(value) => {
        setQuery('')
        setSelected(value)
      }}>
      {/* <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Combobox.Label> */}
      <div className="relative">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event: any) => setQuery(event.target.value)}
          displayValue={(displayValue: {[key: string]: string}) => displayValue[name]}
          onBlur={() => setQuery('')}
          name={name as string}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredOptions.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                  {console.log("'option'",option,name,option[name])}
                    <span className={classNames('block truncate', selected && 'font-semibold')}>{option[name]}</span>

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

export default DropDownWithSearch;