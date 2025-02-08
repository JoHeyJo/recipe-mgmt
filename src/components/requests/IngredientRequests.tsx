import { useState, ChangeEvent } from "react";
import RadioSwitch from "../ui/common/RadioSwitch";
import IngredientInputGroup from "../selectors/IngredientInputGroup";
import { Ingredients } from "../../utils/types";

type IngredientRequestsProps = {
  ingredients: Ingredients;
  ingredientKeys: number[];
  updateIngredients: () => {}
}

function IngredientRequests({ ingredients, ingredientKeys, updateIngredients }) {
  const [whichAttributes, setWhichAttributes] = useState<string>("book");

  /** handle state change for whichIngredients */
  function handleRadio(event: ChangeEvent<HTMLInputElement>) {
    setWhichAttributes(event.target.value)
  }

  return (
    <>
      <RadioSwitch handleSwitch={handleRadio} selection={whichAttributes} />
      {ingredients.map((ingredient, i) =>
        <div key={ingredient.ingredient_id || ingredientKeys[i]} className='flex items-center justify-center'>
          <IngredientInputGroup index={i} ingredient={ingredient} handleUpdate={updateIngredients} />
        </div>
      )}
    </>
  )
}

export default IngredientRequests;