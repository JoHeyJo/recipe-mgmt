import {
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
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
import { RecipeContext, RecipeContextType } from "../../context/RecipeContext";
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
import { defaultIngredient } from "../../utils/templates";
import { ReferenceContext } from "../../context/ReferenceContext";


/** Processes recipe data. Context data is passed through here on edit. Else template data.
 * RecipeRequests data is mutable while context data(reference data) is not
 *
 * MainContainer -> RecipeRequests -> [IngredientsGroup, InstructionsArea, NotesInput, TitleInput]
 */
function RecipeRequests({
  recipeActions,
  setShowing,
  isOpen,
}: RecipeRequestsProps) {
  const { currentBookId, userId } = useContext(UserContext);
  const {
    recipeId,
    created_by_id,
    recipeName,
    requestAction,
    contextIngredients,
    contextInstructions,
    selectedNotes,
  } = useContext(RecipeContext);

  const [recipe, setRecipe] = useState<any>({
    name: recipeName,
    created_by_id,
    id: recipeId,
    ingredients: defaultIngredient,
    instructions: contextInstructions,
    notes: selectedNotes,
  });
  const [error, setError] = useState<string | null>();
  const [isDisabled, setIsDisabled] = useState(true);

  const selectedRecipe = {
    recipeId,
    created_by_id,
    recipeName,
    requestAction,
    contextIngredients,
    contextInstructions,
    selectedNotes,
  };

  // syncs selected original context recipe with mutable recipe state - on edit?
  useEffect(() => {
    setRecipe({
      name: recipeName,
      created_by_id,
      id: recipeId,
      ingredients: contextIngredients,
      instructions: contextInstructions,
      notes: selectedNotes,
    });
  }, [recipeId]);

  /** Enables/disables UPDATE submit */
  useEffect(() => {
    if (requestAction === "edit") {
      const name = compareNames(recipeName, recipe.name);
      const ingredients = compareIngredients(
        contextIngredients,
        recipe.ingredients,
      );
      const instructions = compareInstructions(
        contextInstructions,
        recipe.instructions,
      );
      const notes = compareNotes(selectedNotes, recipe.notes);
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
    originalRecipe: RecipeContextType,
    mutableRecipe: Recipe,
  ) {
    try {
      console.log(originalRecipe,mutableRecipe)
      const mutatedData = filterRecipe(originalRecipe, mutableRecipe);
      mutatedData.created_by_id = created_by_id;
      const res = await API.editBookRecipe(
        userId,
        currentBookId,
        recipeId,
        mutatedData,
      );
      recipeActions.editRecipe();
      return res;
    } catch (error: any) {
      const message = errorHandling("RecipeRequests - editRecipe", error);
      setError(message)
    }
  }
  /** Calls API - sends delete request for recipe */
  async function deleteRecipe(
    userId: number,
    bookId: number,
    recipeId: number,
  ) {
    try {
      const res = API.deleteUserRecipe(userId, currentBookId, recipeId);
      recipeActions.deleteRecipe();
    } catch (error: any) {
      const message = errorHandling("RecipeRequests - addRecipe", error);
      setError(message);
      setTimeout(() => setError(null), 5000);
    }
  }

  function handleDelete() {
    setShowing();
    deleteRecipe(userId, currentBookId, recipeId);
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
            <div className="h-80">
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

                      <div className="flex-1 overflow-hidden">
                        <IngredientsGroup
                          handleRecipeUpdate={handleRecipeUpdate}
                        />
                      </div>
                    </section>

                    <section
                      id="RecipeRequests-instructions"
                      className="flex-col flex flex-1 ml-4 rounded-md"
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
              {requestAction !== "edit" ? (
                <div className="flex">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="inline-flex w-full justify-center rounded-md bg-button-submit px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-default"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => editRecipe(selectedRecipe, recipe)}
                    disabled={isDisabled}
                    className={`${isDisabled ? "bg-button-disabled hover:opacity-100" : "bg-button-submit"} inline-flex w-full justify-center rounded-md px-3 mx-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-default`}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 mx-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-default"
                  >
                    delete
                  </button>
                </div>
              )}
            </div>
            {/* </form> */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default RecipeRequests;
