import { useState, useEffect, useContext } from "react";
import { AttributeData } from "../../utils/types";
import { IngredientInputGroupProps, Options } from "../../utils/props";
import IngredientManager from "../views/IngredientManager";
import { UserContext } from "../../context/UserContext";
import { defaultItem, defaultAmount, defaultUnit } from "../../utils/templates";
import FaPlusButton from "../ui/common/FaPlusButton";
import FaMinusButton from "../ui/common/FaMinusButton";
import Alert from "../ui/Alert";

/** Manages individual components of Ingredient object
 *
 * ComponentsOptionsRequests -> IngredientInputGroup -> IngredientManager
 */
function IngredientInputGroup({
  handleIngredient,
  ingredient,
  index,
  handleOption,
  options,
  length,
}: IngredientInputGroupProps) {
  const [item, setItem] = useState<AttributeData>(ingredient.item);
  const [amount, setAmount] = useState<AttributeData>(ingredient.amount);
  const [unit, setUnit] = useState<AttributeData>(ingredient.unit);
  const [error, setError] = useState<string | null>();

  const { userId, currentBookId } = useContext(UserContext);

  /** Calls parent callback to handleUpdate name */
  function updateIngredientList() {
    const updatedIngredient = { ...ingredient, item, amount, unit };
    handleIngredient.update(updatedIngredient, index);
  }

  /** Changes selected option */
  function updateSelected(state: string, option: AttributeData) {
    if (state === "item") setItem(option);
    if (state === "unit") setUnit(option);
    if (state === "amount") setAmount(option);
    if (
      options.selected === "user" &&
      isOptionNotAssociated(option, options, state)
    )
      handleOption.associate(userId, currentBookId, +option.id, state);
  }

  /** Checks if selected user option already exists in list of user's book options */
  function isOptionNotAssociated(
    option: AttributeData,
    options: Options,
    state: string
  ) {
    const isAssociated = options.references[state].some(
      (o) => o.id === option.id
    );

    return !isAssociated;
  }

  /** Removes selected option */
  function removeSelected(state: string) {
    if (state === "item") setItem(defaultItem);
    if (state === "unit") setUnit(defaultUnit);
    if (state === "amount") setAmount(defaultAmount);
  }

  const handleComponent = {
    updateSelected,
    removeSelected,
    handleError
  };

  /** Maintains parent components state synced with latest selections */
  useEffect(() => {
    updateIngredientList();
  }, [item, amount, unit]);

  /** Checks if ingredient components have any input. This allows dynamic rendering of
   * "+" or "-" button to add or remove additional ingredient inputs
   */
  function renderHandleIngredientUI() {
    if (length === 0) return <FaPlusButton onAction={handleIngredient.add} />;
    return (item.id || amount.id || unit.id) && length === index ? (
      <FaPlusButton onAction={handleIngredient.add} />
    ) : (
      <FaMinusButton onAction={() => handleIngredient.remove(index)} />
    );
  }

  /** Handle error display */
  function handleError(error: string) {
    setError(error);
    setTimeout(()=>{setError(null)},5000)
  }

  return (
    <div>
      <div>{error && <Alert alert={error} degree={"yellow"} />}</div>
      <div className="IngredientInputGroup-Ingredient-section flex rounded-md">
        <IngredientManager
          length={length}
          value={ingredient.amount}
          attribute={"value"}
          entity={"amount"}
          options={options.amounts}
          handleOption={handleOption}
          handleComponent={handleComponent}
          placeholder={"2"}
        />
        <IngredientManager
          length={length}
          value={ingredient.unit}
          attribute={"type"}
          entity={"unit"}
          options={options.units}
          handleOption={handleOption}
          handleComponent={handleComponent}
          placeholder={"oz"}
        />
        <IngredientManager
          length={length}
          value={ingredient.item}
          attribute={"name"}
          entity={"item"}
          options={options.items}
          handleOption={handleOption}
          handleComponent={handleComponent}
          placeholder={"some liquid"}
        />
        {renderHandleIngredientUI()}
      </div>
    </div>
  );
}

export default IngredientInputGroup;
