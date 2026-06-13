import { useState, useContext, useEffect, useRef } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import IngredientsGroup from "../selectors/IngredientsGroup";
import {
  Ingredient,
  Instruction,
  Instructions,
  Recipe,
  Book,
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
import Dropdown from "../ui/common/Dropdown";
import { idText } from "typescript";
import RecipeForm from "../views/RecipeForm";

/** Processes recipe data. Context data is passed through here on edit. Else template data.
 * RecipeRequests data (e.g recipe state) is mutable while context data(reference data) is not
 *
 * Component needs to be refactored - separate API request from component logic
 *
 * MainContainer -> RecipeRequests -> [IngredientsGroup, InstructionsArea, NotesInput, TitleInput]
 */
function RecipeRequests({
  stateActions,
  closeDialog,
  isOpen,
}: RecipeRequestsProps) {
  const { currentBookId, userId, books, setUserData, PRIVILEGES } =
    useContext(UserContext);
  const {
    selectedRecipe,
    requestAction,
    setRecipes,
    setFilteredRecipes,
    recipes,
  } = useContext(RecipeContext);

  const [recipe, setRecipe] = useState<any>(selectedRecipe);
  const [error, setError] = useState<string | null>();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isCopyAuthed, setIsCopyAuthed] = useState(false);
  const [isBookSelectOpen, setIsBookSelectOpen] = useState(false);

  const dialogPanelRef = useRef(null);

  /** replaces dialog with dropdown */
  function openBookDropdown() {
    setIsBookSelectOpen(true);
  }

  /** Updates state with selected book ID - changes book in UI*/
  async function selectBookId(id: number, book: Book) {
    setIsCopyAuthed(PRIVILEGES.sharedInbox);
    setUserData((user) => {
      const userData = { ...user };
      userData.currentBookId = id;
      userData.currentBook = {
        book_role: book.book_role,
        book_type: book.book_type,
        description: book.description,
        id: book.id,
        title: book.title,
      };
      return userData;
    });
    handleCloseDialog();
  }

  /** Calls API to handle recipe copy and state changes in UI */
  async function copyRecipe(targetBookId: number) {
    const res = await handleCopySharedRecipe(targetBookId, recipe);
    setRecipes(res);
    setFilteredRecipes(res);
    setIsCopyAuthed(false);
  }

  /** Handles sequence when user copies a recipe - changing book & copying recipe */
  function triggerCopy(id: number, book: Book) {
    selectBookId(id, book);
    copyRecipe(id);
  }

  // syncs selected original context recipe with mutable recipe state - on edit?
  useEffect(() => {
    setRecipe(selectedRecipe);
  }, [selectedRecipe.id]);

  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" }); // lg breakpoint in Tailwind

  /** Updates recipe state */
  function recipeUpdate(
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
      stateActions.updateRecipes(res);
      return "submitted";
    } catch (error: any) {
      const message = errorHandling("RecipeRequests - addRecipe", error);
      if (message) setError(message);
      setTimeout(() => setError(null), 5000);
    }
  }

  /** Calls API - sends patch request with only edited recipe data */
  async function editRecipe(originalRecipe: Recipe, mutableRecipe: Recipe) {
    try {
      const mutatedData = filterRecipe(originalRecipe, mutableRecipe);
      mutatedData.created_by_id = selectedRecipe.created_by_id;
      const res = await API.patchUserRecipe(
        currentBookId,
        selectedRecipe.id,
        mutatedData,
      );
      stateActions.editRecipe(res);
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
      if (res.message) stateActions.deleteRecipe();
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
      if (res.message) stateActions.deleteRecipe();
    } catch (error) {
      const message = errorHandling(
        "RecipeRequests - handleRemoveSharedRecipe",
        error,
      );
      setError(message);
      setTimeout(() => setError(null), 5000);
    }
  }

  /** Calls API - requests that copy of recipe be added to recipient's recipe book */
  async function copySharedRecipe(targetBookId: number, recipe: Recipe) {
    try {
      const res = await API.postCopySharedRecipe(targetBookId, recipe);
      return res;
    } catch (error) {
      const message = errorHandling(
        "RecipeRequests - handleCopySharedRecipe",
        error,
      );
      setError(message);
      setTimeout(() => setError(null), 5000);
    }
  }

  async function deleteRecipe() {
    await deleteRecipe(userId, currentBookId, selectedRecipe.id);
  }

  async function removeRecipe() {
    handleRemoveSharedRecipe(currentBookId, selectedRecipe.id);
  }

  /** handle recipe submit */
  async function submitRecipe(e) {
    e.preventDefault();
    const res = await addRecipe();
    if (res) closeDialog();
  }

  function handleCloseDialog() {
    closeDialog();
    setTimeout(() => {
      // prevents flash of recipe copy controls
      setIsBookSelectOpen(false);
    }, 50);
  }

  const recipeActions = {
    submit: submitRecipe,
    remove: handleRemoveSharedRecipe(currentBookId, selectedRecipe.id),
    delete: handleDeleteRecipe(userId, currentBookId, selectedRecipe.id),
    edit: handleEditRecipe,
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseDialog} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen">
        <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            id="RecipeRequests-DialogPanel"
            ref={dialogPanelRef}
            transition
            className={`relative flex flex-col transform rounded-lg bg-primary px-4 pb-4 pt-5 text-left shadow-xl transition-all ${isBookSelectOpen ? "" : "sm:my-8 sm:w-full sm:max-w-4xl sm:p-6"}`}
          >
            {isBookSelectOpen ? (
              <Dropdown
                selected={null}
                options={books}
                handleIdChange={triggerCopy}
                isActionCopy={true}
              />
            ) : (
              <RecipeForm />
            )}
            {/* </form> */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default RecipeRequests;
