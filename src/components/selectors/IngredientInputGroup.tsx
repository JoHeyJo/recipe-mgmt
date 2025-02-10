import { useState, useEffect } from 'react';
import OptionRequests from '../requests/OptionRequests';
import { AttributeData } from '../../utils/types';
import { IngredientInputGroupProps } from '../../utils/props';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import API from '../../api';
import { errorHandling } from '../../utils/ErrorHandling';
import IngredientManager from '../views/IngredientManager';

const defaultItem = { id: null, name: "" };
const defaultAmount = { id: null, value: "" };
const defaultUnit = { id: null, type: "" };

/** Creates individual Ingredient object 
 * 
 * IngredientRequests -> IngredientInputGroup -> OptionRequests
*/
function IngredientInputGroup({ handleIngredient, ingredient, index }: IngredientInputGroupProps) {
  const [item, setItem] = useState<AttributeData>(ingredient.item);
  const [amount, setAmount] = useState<AttributeData>(ingredient.amount);
  const [unit, setUnit] = useState<AttributeData>(ingredient.unit);

  const { currentBookId, userId } = useContext(UserContext);

  /** Request to create new ingredient option */
  async function addOption(entity: string, attributeObject: AttributeData): Promise<AttributeData> {
    try {
      const id = await API.postBookIngredient(attributeObject, currentBookId, userId, entity);
      return id;
    } catch (error: any) {
      errorHandling("IngredientRequests - addOption", error)
      throw error
    }
  }

  /** Calls parent callback to handleUpdate name */
  function updateIngredientList() {
    const updatedIngredient = { ...ingredient, item, amount, unit };
    handleIngredient.update(updatedIngredient, index)
  }

  /** Handles changes made to option state */
  function updateState(state: string, option: AttributeData) {
    if (state === "name") setItem(option)
    if (state === "type") setUnit(option)
    if (state === "value") setAmount(option)
  }

  /** Removes deselected option */
  function removeDeselectedInput(state: string) {
    if (state === "name") setItem(defaultItem);
    if (state === "type") setUnit(defaultUnit);
    if (state === "value") setAmount(defaultAmount);
  }

  const handleOptions = {
    removeDeselectedInput,
    addOption
  }

  /** Maintains parent components state synced with latest selections */
  useEffect(() => {
    updateIngredientList()
  }, [item, amount, unit])

  return (
    <div className="flex rounded-md">
      <IngredientManager value={ingredient.amount} attribute={"value"} entity={"amount"} handleOptionChange={updateState} options={quantityAmount} postRequest={addOption} handleOptions={handleOptions} />
      <IngredientManager value={ingredient.amount} attribute={"type"} entity={"unit"} handleOptionChange={updateState} options={quantityUnits} postRequest={addOption} handleOptions={handleOptions} />
      <IngredientManager value={ingredient.amount} attribute={"name"} entity={"item"} handleOptionChange={updateState} options={items} postRequest={addOption} handleOptions={handleOptions} />
      {/* <OptionRequests value={ingredient.amount} handleOptions={handleOptions} handleOptionChange={updateState} options={quantityAmount} attribute={"value"} entity={"amount"} />
      <OptionRequests value={ingredient.unit} handleOptions={handleOptions} handleOptionChange={updateState} options={quantityUnits} attribute={"type"} entity={"unit"} />
      <OptionRequests value={ingredient.item} handleOptions={handleOptions} handleOptionChange={updateState} options={items} attribute={"name"} entity={"item"} /> */}
    </div>
  )
}

export default IngredientInputGroup;