import { useState, ChangeEvent } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

function InstructionManager({ arrayKey, name, handleOptionChange, options, manageInstructions }) {
  const [query, setQuery] = useState<string>(''); // Track input value
  const [selected, setSelected] = useState(null); // Track selected option

  // Automatically add input field when the last option is reached
  if (arrayKey === options.length - 2) manageInstructions.createInstructionInput();

  // Filter options based on the current query
  const filteredOptions = query === '' ? options : options.filter((i) =>
    i.instruction.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Combobox
        value={selected}
        onChange={(selected) => {
          setSelected(selected); // Set the selected person when an option is chosen
          setQuery(''); // Reset the query after selecting an option
        }}
      >
        <div className="relative">
          <Combobox.Input
            placeholder={name} // Placeholder text
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={query} // Control the input field's value with the query
            onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)} // Update query on input change
            onBlur={() => setQuery('')} // Optional: Clear query on blur
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>

          {filteredOptions.length > 0 && (
            <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto">
              {filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.id}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'}`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-semibold' : ''}`}>
                        {option.instruction}
                      </span>

                      {selected && (
                        <span
                          className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? 'text-white' : 'text-indigo-600'}`}
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
  );
}

export default InstructionManager;
