import API from '../../api';
import { errorHandling } from '../../utils/ErrorHandling';
import IngredientManager from '../views/IngredientManager';
import { Attribute } from '../../utils/types';

type OptionRequestsProps = {
  value: any;
  name: string
  handleOptionChange: (state: string, option: Attribute) => void;
  options: Attribute[];
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
  async function addOption(option: Attribute): Promise<Attribute>   {
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