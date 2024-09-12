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
  const filteredOptions =
    query === ''
      ? options
      : dropDownSelection(options,query, name)

  function dropDownSelection(options: Option[], query: string, name: string) {
    if (options.length === 0) {
      // Return the "+ create..." option if no options exist
      return [{ id: null, [name]: '+ create...' }];
    } else {
      // Filter options based on query and handle the "+ create" option if no match is found
      const filteredOptions = options.reduce<Option[]>((currentOptions, option) => {
        const isOptionAvailable = (option[name as keyof Option] as string)
          .toLowerCase()
          .includes(query.toLowerCase());

        // If the option matches the query, add it to the filtered options
        if (isOptionAvailable) currentOptions.push(option);
        // If no options match the query, add a "+ create..." option
        if (filteredOptions.length === 0) 
          filteredOptions.push({ id: null, [name]: '+ create...' });

        return currentOptions;
      }, []);


      return filteredOptions;
    }
  }



  /** Handles parent state update when changes are made to combobox */
  async function handleChange(option: any) {
    console.log("option",option)
    if (option.id === null && option[name] === '+ create...') {
      // new object needs to have query string injected as a value
      option[name] = query;
      option = postRequest(option);
      handleAdd(name, option)
    }
    setSelected(option);
  };

  /** Consolidates actions taken when dropdown value is selected  */
  function onValueSelect(value: any) {
    console.log("onValueSelect",value)
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

// USE THIS TEMPLATE SO THAT COMBOBOXDROPDOWN CAN BE ADJUST SO THAT IT CAN HANDLE BOTH INGREDIENT MANAGER AND INSTRUCTION MANAGER ()
// {/* <Combobox as="div" value={selected}
//       onChange={(value) => {
//         setQuery('')
//         handleChange(value)
//       }}>
//       {/* <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Combobox.Label> */}
// <div className="relative">
//   <Combobox.Input
//     placeholder={name}
//     className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//     onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
//     displayValue={(displayValue: { [key: string]: string }) => displayValue?.[name]}
//     // onBlur={() => setQuery('')}
//     name={name as string}
//   />
//   <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//     <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//   </Combobox.Button>

//   {filteredOptions.length > 0 && (
//     <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//       {filteredOptions.map((option) => (
//         <Combobox.Option
//           key={option.id}
//           value={option}
//           className={({ active }) =>
//             classNames(
//               'relative cursor-default select-none py-2 pl-3 pr-9',
//               active ? 'bg-indigo-600 text-white' : 'text-gray-900'
//             )
//           }
//         >
//           {({ active, selected }) => (
//             <>
//               <span className={classNames('block truncate', selected && 'font-semibold')}>{option[name as keyof Option]}</span>

//               {selected && (
//                 <span
//                   className={classNames(
//                     'absolute inset-y-0 right-0 flex items-center pr-4',
//                     active ? 'text-white' : 'text-indigo-600'
//                   )}
//                 >
//                   <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                 </span>
//               )}
//             </>
//           )}
//         </Combobox.Option>
//       ))}
//     </Combobox.Options>
//   )}
// </div>
//     </Combobox > */}