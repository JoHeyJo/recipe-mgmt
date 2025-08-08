import {
  useState,
  useContext,
  useEffect,
  FormEventHandler,
  FormEvent,
  useRef
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
    recipeName,
    requestAction,
    contextIngredients,
    contextInstructions,
    selectedNotes,
  } = useContext(RecipeContext);

  const [recipe, setRecipe] = useState<any>({
    name: recipeName,
    id: recipeId,
    ingredients: defaultIngredient,
    instructions: contextInstructions,
    notes: selectedNotes,
  });
  const [error, setError] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  const recipeRequestRef = useRef<HTMLDivElement>(null);

  const selectedRecipe = {
    recipeId,
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
        recipe.ingredients
      );
      const instructions = compareInstructions(
        contextInstructions,
        recipe.instructions
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
    section: string
  ) {
    setRecipe((prevRecipe) => ({ ...prevRecipe, [section]: data }));
  }

  /** Calls API - sends post request with recipe data */
  // ADD A CHECK TO FILTER OUT EMPTY FIELDS E.G. ingredient/instructions without values
  async function addRecipe() {
    try {
      const filteredRecipe = filterTemplate(recipe, recipeTemplate);
      const res = await API.postUserRecipe(
        filteredRecipe,
        currentBookId,
        userId
      );
      recipeActions.updateRecipes(res);
      return "submitted";
    } catch (error: any) {
      errorHandling("RecipeRequests - addRecipe", error);
      setError(error.error);
      setTimeout(() => setError(null), 5000);
    }
  }

  /** Calls API - sends patch request with only edited recipe data */
  async function editRecipe(
    originalRecipe: RecipeContextType,
    mutableRecipe: Recipe
  ) {
    try {
      const mutatedData = filterRecipe(originalRecipe, mutableRecipe);
      const res = await API.editBookRecipe(
        userId,
        currentBookId,
        recipeId,
        mutatedData
      );
      recipeActions.editRecipe();
      return res;
    } catch (error: any) {
      errorHandling("RecipeRequests - editRecipe", error);
    }
  }
  /** Calls API - sends delete request for recipe */
  async function deleteRecipe(
    userId: number,
    bookId: number,
    recipeId: number
  ) {
    try {
      const res = API.deleteUserRecipe(userId, currentBookId, recipeId);
      recipeActions.deleteRecipe();
    } catch (error: any) {
      setError(error.message);
      setTimeout(() => setError(null), 5000);
      errorHandling("RecipeRequests - addRecipe", error);
    }
  }

  function handleDelete() {
    setShowing();
    deleteRecipe(userId, currentBookId, recipeId);
  }

  async function handleSubmit() {
    // e.preventDefault()
    const res = await addRecipe();
    if (res) setShowing();
  }

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <Dialog
      ref={recipeRequestRef}
      open={isOpen}
      onClose={setShowing}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed h-full inset-0 z-10 w-screen">
        <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            // ref={recipeRequestRef}
            id="RecipeRequests-DialogPanel"
            transition
            className="min-h-0 max-h-[80vh] relative flex flex-col transform rounded-lg bg-primary px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6"
          >
            {error && <Alert alert={error} degree={"yellow"} />}{" "}
            {/* This will be a popup instead */}
            {/* <form onSubmit={handleSubmit}> */}
            <div className="">
              <section
                id="RecipeRequests-book"
                className="min-h-0 mx-auto h-full flex-col "
              >
                <section id="RecipeRequests-recipe" className="flex h-2/3">
                  <section
                    id="RecipeRequests-title-ingredients"
                    className="min-h-0 flex-1 h-full flex flex-col"
                  >
                    <div className="min-h-0 ">
                      <TitleInput handleUpdate={handleRecipeUpdate} />
                    </div>
                    <div className="min-h-0 flex-1 overflow-hidden">
                      <IngredientsGroup
                        handleRecipeUpdate={handleRecipeUpdate}
                      />
                    </div>
                  </section>
                  <section
                    ref={recipeRequestRef}
                    id="RecipeRequests-instructions"
                    className="min-h-0 flex-col flex flex-1 ml-4 rounded-md"
                  >
                    <InstructionsRequests
                      recipeRequestRef={recipeRequestRef}
                      handleRecipeUpdate={handleRecipeUpdate}
                    />
                  </section>
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
