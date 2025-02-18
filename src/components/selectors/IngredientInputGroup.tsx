import { useState, useEffect, useContext } from 'react';
import { AttributeData } from '../../utils/types';
import { IngredientInputGroupProps, Options } from '../../utils/props';
import IngredientManager from '../views/IngredientManager';
import { UserContext } from '../../context/UserContext';

const defaultItem = { id: null, name: "" };
const defaultAmount = { id: null, value: "" };
const defaultUnit = { id: null, type: "" };

/** Manages individual components of Ingredient object
 * 
 * ComponentsOptionsRequests -> IngredientInputGroup -> IngredientManager
*/
function IngredientInputGroup({ handleIngredient, ingredient, index, handleOption, options }: IngredientInputGroupProps) {
  const [item, setItem] = useState<AttributeData>(ingredient.item);
  const [amount, setAmount] = useState<AttributeData>(ingredient.amount);
  const [unit, setUnit] = useState<AttributeData>(ingredient.unit);

  const { userId, currentBookId } = useContext(UserContext);

  /** Calls parent callback to handleUpdate name */
  function updateIngredientList() {
    const updatedIngredient = { ...ingredient, item, amount, unit };
    handleIngredient.update(updatedIngredient, index)
  }

  /** Changes selected option */
  function updateSelected(state: string, option: AttributeData) {
    if (state === "item") setItem(option)
    if (state === "unit") setUnit(option)
    if (state === "amount") setAmount(option)
    console.log("REFERENCES>>>", options.references)
    console.log("COMPONENT>>>", state)
    console.log("OPTION>>>", option)
    if (options.selected === "user" && isOptionNotAssociated(option, options, state)) handleOption.associate(userId, currentBookId, +option.id, state)
  }

  function isOptionNotAssociated(option: AttributeData, options: Options, state: string) {
    // let attribute = undefined;

    // switch (state) {
    //   case "amount":
    //     attribute = "value";
    //     break;
    //   case "unit":
    //     attribute = "type";
    //     break;
    //   case "item":
    //     attribute = "name";
    //     break;
    // }

    const isAssociated = options.references[state].some(o => o.id === option.id);

    return !isAssociated
  }

  /** Removes selected option */
  function removeSelected(state: string) {
    if (state === "item") setItem(defaultItem);
    if (state === "unit") setUnit(defaultUnit);
    if (state === "amount") setAmount(defaultAmount);
  }

  const handleComponent = {
    updateSelected,
    removeSelected
  }

  /** Maintains parent components state synced with latest selections */
  useEffect(() => {
    updateIngredientList()
  }, [item, amount, unit])

  return (
    <div className="flex rounded-md">
      <IngredientManager value={ingredient.amount} attribute={"value"} entity={"amount"} options={options.amounts} handleOption={handleOption} handleComponent={handleComponent} />
      <IngredientManager value={ingredient.unit} attribute={"type"} entity={"unit"} options={options.units} handleOption={handleOption} handleComponent={handleComponent} />
      <IngredientManager value={ingredient.item} attribute={"name"} entity={"item"} options={options.items} handleOption={handleOption} handleComponent={handleComponent} />
    </div>
  )
}

export default IngredientInputGroup;