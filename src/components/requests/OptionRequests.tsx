import API from '../../api';
import { errorHandling } from '../../utils/ErrorHandling';
import IngredientManager from '../views/IngredientManager';
import { AttributeData } from '../../utils/types';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

type OptionRequestsProps = {
  value: any;
  entity: string
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

function OptionRequests({ value, entity, handleOptionChange, options, handleOptions, attribute }: OptionRequestsProps) {
  const { currentBookId, userId } = useContext(UserContext);

  /** Request to create new ingredient option */
  async function addOption(attributeObject: AttributeData): Promise<AttributeData> {
    try {
      const id = await API.postBookIngredient(attributeObject, currentBookId, userId, entity);
      return id;
    } catch (error: any) {
      errorHandling("OptionRequests - addOption", error)
      throw error
    }
  }

  return (
    <IngredientManager
      value={value}
      attribute={attribute}
      entity={entity}
      handleOptionChange={handleOptionChange}
      options={options}
      postRequest={addOption}
      handleOptions={handleOptions} />
  )
}

export default OptionRequests;