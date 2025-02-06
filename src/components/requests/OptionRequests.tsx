import API from '../../api';
import { errorHandling } from '../../utils/ErrorHandling';
import IngredientManager from '../views/IngredientManager';
import { AttributeData } from '../../utils/types';

type OptionRequestsProps = {
  value: any;
  name: string
  handleOptionChange: (state: string, attributeObject: AttributeData) => void;
  options: AttributeData[];
  handleOptions: object;
  attribute: string
}

/** OptionRequests - Consider removing. Is intermediary component to hold requests necessary?
 * 
 * Makes API request to create new ingredient
 * 
 * IngredientInputGroup -> OptionRequests -> IngredientManager
 */

function OptionRequests({ value, name, handleOptionChange, options, handleOptions, attribute}: OptionRequestsProps) {
  

  /** Request to create new ingredient option */
  async function addOption(attributeObject: AttributeData): Promise<AttributeData>   {
    try {
      const id = await API.postBookIngredient(attributeObject, bookId, userId, attribute);
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