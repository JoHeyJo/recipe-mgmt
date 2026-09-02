import { useRef, useState, useEffect, useContext } from "react";
import Alert from "../ui/Alert";
import { ReferenceContext } from "../../context/ReferenceContext";
import TitleInput from "../ui/TitleInput";
import InstructionsRequests from "../requests/InstructionsRequests";
import NotesInput from "../ui/NotesInput";
import RecipeFormControls from "../ui/controls/RecipeFormControls";
import IngredientsGroup from "../selectors/IngredientsGroup";
import {
  compareIngredients,
  compareInstructions,
  compareNames,
  compareNotes,
} from "../../utils/filters";
import { RecipeContext } from "../../context/RecipeContext";
import { DataContext } from "../../context/DataContext";
import useDataRequest from "../../hooks/useDataRequest";
import { FormData, IngredientOptions, Instructions } from "../../utils/types";
import { AttributeData } from "../../utils/types";
import FormContainer from "./common/FormContainer";

/**
 * RecipeRequests -> RecipeForm -> [IngredientsGroup, InstructionsArea, NotesInput, TitleInput]
 */
function RecipeForm({
  error,
  recipeInput,
  onUpdateRecipeInput,
  onOpenBookDropdown,
  recipeAction,
}) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [instructions, setInstructions] = useState<Instructions>([]);
  const [ingredientOptions, setIngredientOptions] = useState<IngredientOptions>(
    {
      items: [],
      amounts: [],
      units: [],
    },
  );

  const { requestData, isBookSource } = useDataRequest();
  const { requestAction, selectedRecipe } = useContext(RecipeContext);
  const dialogPanelRef = useRef(null);

  const formData = {
    ingredientOptions,
    instructions,
    setInstructions,
    setIngredientOptions,
    requestData,
    isBookSource,
  };

  /** Enables/disables UPDATE submit */
  useEffect(() => {
    if (requestAction.edit) {
      const name = compareNames(selectedRecipe.name, recipeInput.name);
      const ingredients = compareIngredients(
        selectedRecipe.ingredients,
        recipeInput.ingredients,
      );
      const instructions = compareInstructions(
        selectedRecipe.instructions,
        recipeInput.instructions,
      );
      const notes = compareNotes(selectedRecipe.notes, recipeInput.notes);
      const isAltered = name || ingredients || instructions || notes;
      setIsDisabled(!isAltered);
    }
  }, [recipeInput]);

  useEffect(() => {
    (async () => {
      const data = await requestData(isBookSource);
        setInstructions(data.instructions);
      setIngredientOptions(data.ingredients);
    })();
  }, []);

  return (
    <>
  
      <FormContainer />
    </>
  );
}

export default RecipeForm;
