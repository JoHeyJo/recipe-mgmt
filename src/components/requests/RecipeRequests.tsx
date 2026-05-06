import { useState, useContext, useEffect, useRef } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import IngredientsGroup from "../selectors/IngredientsGroup";
import {
  Ingredient,
  Instruction,
  Instructions,
  Recipe,
} from "../../utils/types";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";
import { useMediaQuery } from "react-responsive";
import InstructionsRequests from "./InstructionsRequests";
import { UserContext } from "../../context/UserContext";
import { RecipeRequestsProps } from "../../utils/props";
import NotesInput from "../ui/NotesInput";
import { RecipeContext } from "../../context/RecipeContext";
import {
  compareIngredients,
  compareInstructions,
  compareNames,
  filterRecipe,
  compareNotes,
  filterTemplate,
} from "../../utils/filters";
import TitleInput from "../ui/TitleInput";
import { recipeTemplate } from "../../utils/templates";
import Alert from "../ui/Alert";
import { ReferenceContext } from "../../context/ReferenceContext";
import RecipeFormControls from "../ui/controls/RecipeFormControls";

/** Processes recipe data. Context data is passed through here on edit. Else template data.
 * RecipeRequests data (e.g recipe state) is mutable while context data(reference data) is not
 *
 * Component needs to be refactored - separate API request from component logic
 *
 * MainContainer -> RecipeRequests -> [IngredientsGroup, InstructionsArea, NotesInput, TitleInput]
 */
function RecipeRequests({
  recipeActions,
  setShowing,
  isOpen,
}: RecipeRequestsProps) {
  const { currentBookId, userId } = useContext(UserContext);
  const { selectedRecipe, requestAction } = useContext(RecipeContext);


  const [recipe, setRecipe] = useState<any>(selectedRecipe);
  const [error, setError] = useState<string | null>();
  const [isDisabled, setIsDisabled] = useState(true);

  // syncs selected original context recipe with mutable recipe state - on edit?
  useEffect(() => {
    setRecipe(selectedRecipe);
  }, [selectedRecipe.id]);

  /** Enables/disables UPDATE submit */
  useEffect(() => {
    if (requestAction === "edit") {
      const name = compareNames(selectedRecipe.name, recipe.name);
      const ingredients = compareIngredients(
        selectedRecipe.ingredients,
        recipe.ingredients,
      );
      const instructions = compareInstructions(
        selectedRecipe.instructions,
        recipe.instructions,
      );
      const notes = compareNotes(selectedRecipe.notes, recipe.notes);
      const isAltered = name || ingredients || instructions || notes;
      setIsDisabled(!isAltered);
    }
  }, [recipe]);

  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" }); // lg breakpoint in Tailwind

  /** Updates recipe state */
  function handleRecipeUpdate(
    data: string | Ingredient[] | Instruction | Instructions,
    section: string,
  ) {
    setRecipe((prevRecipe) => ({ ...prevRecipe, [section]: data }));
  }

  /** Calls API - sends post request with recipe data */
  async function addRecipe() {
    try {
      const filteredRecipe = filterTemplate(recipe, recipeTemplate);
      const res = await API.postUserRecipe(
        filteredRecipe,
        currentBookId,
        userId,
      );
      recipeActions.updateRecipes(res);
      return "submitted";
    } catch (error: any) {
      const message = errorHandling("RecipeRequests - addRecipe", error);
      if (message) setError(message);
      setTimeout(() => setError(null), 5000);
    }
  }

  /** Calls API - sends patch request with only edited recipe data */
  async function editRecipe(
    originalRecipe: Recipe,
    mutableRecipe: Recipe,
  ) {
    try {
      const mutatedData = filterRecipe(originalRecipe, mutableRecipe);
      mutatedData.created_by_id = selectedRecipe.created_by_id;
      const res = await API.patchUserRecipe(
        currentBookId,
        selectedRecipe.id,
        mutatedData,
      );
      recipeActions.editRecipe(res);
    } catch (error: any) {
      const message = errorHandling("RecipeRequests - editRecipe", error);
      setError(message);
      setTimeout(() => setError(null), 5000);
    }
  }
  /** Calls API - sends delete request for recipe */
  async function deleteRecipe(
    userId: number,
    bookId: number,
    recipeId: number,
  ) {
    try {
      const res = await API.deleteUserRecipe(
        userId,
        currentBookId,
        recipeId,
        selectedRecipe.created_by_id,
      );
      if (res.message) recipeActions.deleteRecipe();
    } catch (error: any) {
      const message = errorHandling("RecipeRequests - deleteRecipe", error);
      setError(message);
      setTimeout(() => setError(null), 5000);
    }
  }

  /** Calls API - delete shared recipe association */
  async function removeSharedRecipe(bookId: number, recipeId: number) {
    try {
      const res = await API.deleteSharedRecipe(bookId, recipeId);
      if (res.message) recipeActions.deleteRecipe();
    } catch (error) {
      const message = errorHandling(
        "RecipeRequests - removeSharedRecipe",
        error,
      );
      setError(message);
      setTimeout(() => setError(null), 5000);
    }
  }

  async function handleDelete() {
    await deleteRecipe(userId, currentBookId, selectedRecipe.id);
  }

  async function handleRemove() {
    await removeSharedRecipe(currentBookId, selectedRecipe.id);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await addRecipe();
    if (res) setShowing();
  }

  const dialogPanelRef = useRef(null);

  return (
    <Dialog open={isOpen} onClose={setShowing} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed h-full inset-0 z-10 w-screen">
        <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            id="RecipeRequests-DialogPanel"
            ref={dialogPanelRef}
            transition
            className="relative flex flex-col transform rounded-lg bg-primary px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6"
          >
            {error && <Alert alert={error} degree={"yellow"} />}{" "}
            {/* This will be a popup instead */}
            {/* <form onSubmit={handleSubmit}> */}
            <div className="">
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

              <section
                id="RecipeRequests-book"
                className="mx-auto h-full flex-col "
              >
                <section id="RecipeRequests-recipe" className="flex h-2/3">
                  <ReferenceContext.Provider
                    value={{ dialogPanelRef: dialogPanelRef }}
                  >
                    <section
                      id="RecipeRequests-title-ingredients"
                      className="flex-1 h-full flex flex-col"
                    >
                      <div className="">
                        <TitleInput handleUpdate={handleRecipeUpdate} />
                      </div>

                      <div
                        id="RecipeRequests-ingredients"
                        className="flex-1 overflow-hidden"
                      >
                        <IngredientsGroup
                          handleRecipeUpdate={handleRecipeUpdate}
                        />
                      </div>
                    </section>

                    <section
                      id="RecipeRequests-instructions"
                      className="flex-col h-full flex flex-1 ml-4 rounded-md"
                    >
                      <InstructionsRequests
                        handleRecipeUpdate={handleRecipeUpdate}
                      />
                    </section>
                  </ReferenceContext.Provider>
                </section>

                <section id="RecipeRequests-notes" className="">
                  <NotesInput handleUpdate={handleRecipeUpdate} />
                </section>
              </section>
              {/* </div> */}
            </div>
            <div className="SubmitButton mt-5 sm:mt-6">
              <RecipeFormControls
                handleSubmit={handleSubmit}
                isDisabled={isDisabled}
                recipe={recipe}
                handleRemove={handleRemove}
                handleDelete={handleDelete}
                editRecipe={editRecipe}
              />
            </div>
            {/* </form> */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default RecipeRequests;
