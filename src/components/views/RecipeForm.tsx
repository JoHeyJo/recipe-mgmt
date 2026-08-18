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
      const data = await requestData();
      setInstructions(data.instructions);
      setIngredientOptions(data.ingredients);
    })();
  }, []);

  return (
    <>
      {error && <Alert alert={error} degree={"yellow"} />}{" "}
      {/* This will be a popup instead */}
      {/* <form onSubmit={handleSubmit}> */}
      <div className={!requestAction.copy ? "h-80" : ""}>
        {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
              </div> */}
        {/* <div className="mt-3 h-full border-2 border-yellow-300 text-center sm:mt-5"> */}
        {/* <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                  Payment successful
                </DialogTitle> */}
        {/* <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                  </p>
                </div> */}
        {requestAction.copy && (
          <p>
            NOTE: Once a recipe is copied to a recipe book, you will be the
            owner of that copy.{" "}
          </p>
        )}

        {!requestAction.copy && (
          <section
            id="RecipeRequests-book"
            className="mx-auto h-full flex-col "
          >
            <section id="RecipeForm-recipe" className="flex h-3/4">
              <ReferenceContext.Provider
                value={{ dialogPanelRef: dialogPanelRef }}
              >
                <DataContext.Provider value={formData}>
                  <section
                    id="RecipeRequests-title-ingredients"
                    className="flex-1 h-full flex flex-col"
                  >
                    <div className="">
                      <TitleInput onTitleInput={onUpdateRecipeInput} />
                    </div>

                    <div
                      id="RecipeRequests-ingredients"
                      className="flex-1 overflow-hidden"
                    >
                      <IngredientsGroup
                        onIngredientInput={onUpdateRecipeInput}
                      />
                    </div>
                  </section>

                  <section
                    id="RecipeRequests-instructions"
                    className="flex-col flex flex-1 ml-4 rounded-md"
                  >
                    <InstructionsRequests
                      onInstructionInput={onUpdateRecipeInput}
                    />
                  </section>
                </DataContext.Provider>
              </ReferenceContext.Provider>
            </section>

            <section id="RecipeRequests-notes">
              <NotesInput onNotesInput={onUpdateRecipeInput} />
            </section>
          </section>
        )}
        {/* </div> */}
      </div>
      <div className="SubmitButton mt-5 sm:mt-6">
        <RecipeFormControls
          recipeAction={recipeAction}
          isDisabled={isDisabled}
          onOpenDropdown={onOpenBookDropdown}
        />
      </div>
    </>
  );
}

export default RecipeForm;
