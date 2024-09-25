import { Option } from '../../utils/types';
import API from '../../api';
import { errorHandling } from '../../utils/ErrorHandling';
import IngredientManager from '../ui/IngredientManager';

type OptionRequests = {
  name: string
  handleOptionChange: (state: string, option: Option) => void;
  options: Option[];
  handleOptions: object
}

/** OptionRequests - Consider removing. Is intermediary component to hold requests necessary?
 * 
 * Makes API request to create new ingredient
 * 
 * IngredientInputGroup -> OptionRequests -> IngredientManager
 */

function OptionRequests({ name, handleOptionChange, options, handleOptions }: OptionRequests) {

  /** Request to create new ingredient option */
  async function addOption(option: Option): Promise<Option>   {
    try {
      const id = await API.postOption(option, name);
      return id;
    } catch (error: any) {
      errorHandling("OptionRequests - addOption", error)
      throw error
    }
  }

  return (
    <IngredientManager
      name={name}
      handleOptionChange={handleOptionChange}
      options={options}
      postRequest={addOption}
      handleOptions={handleOptions} />
  )
}

export default OptionRequests;