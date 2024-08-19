import { Option } from '../../utils/types';
import API from '../../api';
import { errorHandling } from '../../utils/ErrorHandling';
import DropdownWithSearch from '../ui/ComboboxWithSearch';

function uniqueID() {
  return Math.random();
}

const unique: any = () => Math.random()

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

type OptionDropdown = {
  name: string
  handleOptionChange: (state: string, option: Option) => void;
  options: Option[];
  handleAddOption: (state: string, option: Option) => void;
}

/** OptionDropdown 
 * 
 * Option input field with capability to create new options.
 * Makes API request to create new ingredient
 * 
 * IngredientInputGroup -> OptionDropdown -> DropdownWithSearch
 */

function OptionDropdown({ name, handleOptionChange, options, handleAddOption }: OptionDropdown) {

  /** Calls api to create new ingredient option */
  async function addOption(option: Option) {
    try {
      const id = await API.postOption(option, name);
      return id;
    } catch (error: any) {
      errorHandling("OptionDropdown - addOption", error)
    }
  }

  return (
    <DropdownWithSearch
      name={name}
      handleOptionChange={handleOptionChange}
      options={options}
      handleAddOption={handleAddOption}
      postRequest={addOption} />
  )
}

export default OptionDropdown;