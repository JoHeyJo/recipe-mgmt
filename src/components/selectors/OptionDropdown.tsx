import { Option } from '../../utils/types';
import API from '../../api';
import { errorHandling } from '../../utils/ErrorHandling';
import IngredientManager from '../ui/IngredientManager';

type OptionDropdown = {
  name: string
  handleOptionChange: (state: string, option: Option) => void;
  options: Option[];
  handleAddOption: (state: string, option: Option) => void;
  handleOptions: object
}

/** OptionDropdown 
 * 
 * Option input field with capability to create new options.
 * Makes API request to create new ingredient
 * 
 * IngredientInputGroup -> OptionDropdown -> IngredientManager
 */

function OptionDropdown({ name, handleOptionChange, options, handleAddOption, handleOptions }: OptionDropdown) {
  /** Request to create new ingredient option */
  async function addOption(option: Option): Promise<Option>   {
    try {
      const id = await API.postOption(option, name);
      return id;
    } catch (error: any) {
      errorHandling("OptionDropdown - addOption", error)
      throw error
    }
  }

  return (
    <IngredientManager
      name={name}
      handleOptionChange={handleOptionChange}
      options={options}
      handleAdd={handleAddOption}
      postRequest={addOption}
      handleOptions={handleOptions} />
  )
}

export default OptionDropdown;