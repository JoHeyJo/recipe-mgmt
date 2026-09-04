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
    <form
      id="FormContainer-book"
      // onSubmit={}
      className="flex min-h-0 flex-1 w-full flex-col"
    >
      {error && <Alert alert={error} degree={"yellow"} />}{" "}
      {requestAction.copy && (
        <p>
          NOTE: Once a recipe is copied to a recipe book, you will be the owner
          of that copy.{" "}
        </p>
      )}
      {!requestAction.copy && (
        <>
          {/* ── Row 1: half the container. Stacks on mobile, two columns from md up. */}
          <ReferenceContext.Provider value={{ dialogPanelRef: dialogPanelRef }}>
            <DataContext.Provider value={formData}>
              <div
                id="FormContainer-title-ingredients"
                className="min-h-0 flex basis-4/6 sm:basis-3/5 flex-col gap-3 sm:flex-row"
              >
                {/* Left column */}
                <div
                  id="FormContainer-left-panel"
                  className="flex min-h-0 min-w-0 flex-1 flex-col "
                >
                  <TitleInput onTitleInput={onUpdateRecipeInput} />

                  {/* Grows with its contents, scrolls once it runs out of room */}
                  <div
                    id="FormContainer-ingredients"
                    className="flex min-h-0 w-full flex-1"
                  >
                    <IngredientsGroup onIngredientInput={onUpdateRecipeInput} />
                  </div>
                </div>

                {/* Right column: single box filling the rest of the row */}
                <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                  <InstructionsRequests
                    onInstructionInput={onUpdateRecipeInput}
                  />
                </div>
              </div>
            </DataContext.Provider>
          </ReferenceContext.Provider>
          {/* ── Row 2: takes whatever height is left */}
          <div id="FormContainer-notes" className="min-h-0 w-full flex-1">
            <NotesInput onNotesInput={onUpdateRecipeInput} />
          </div>
        </>
      )}
      {/* ── Row 3: just the button, sized to its content */}
      <div className="shrink-0">
        <RecipeFormControls
          recipeAction={recipeAction}
          isDisabled={isDisabled}
          onOpenDropdown={onOpenBookDropdown}
        />
      </div>
    </form>
  );
}

export default RecipeForm;
