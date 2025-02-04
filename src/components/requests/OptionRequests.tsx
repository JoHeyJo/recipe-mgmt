import { Option } from '../../utils/types';
import API from '../../api';
import { errorHandling } from '../../utils/ErrorHandling';
import IngredientManager from '../views/IngredientManager';

type OptionRequestsProps = {
  value: any;
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

function OptionRequests({ value, name, handleOptionChange, options, handleOptions }: OptionRequestsProps) {
  /** Request to create new ingredient option */
  async function addOption(option: Option): Promise<Option>   {
    try {
      const id = await API.postIngredient(option, name);
      return id;
    } catch (error: any) {
      errorHandling("OptionRequests - addOption", error)
      throw error
    }
  }

  return (
    <IngredientManager
      value={value}
      name={name}
      handleOptionChange={handleOptionChange}
      options={options}
      postRequest={addOption}
      handleOptions={handleOptions} />
  )
}

export default OptionRequests;