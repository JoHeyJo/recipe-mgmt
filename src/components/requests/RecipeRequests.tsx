import { useState, useContext, useEffect, useRef } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
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
import { UserContext } from "../../context/UserContext";
import { RecipeRequestsProps } from "../../utils/props";
import { RecipeContext } from "../../context/RecipeContext";
import { filterRecipe, filterTemplate } from "../../utils/filters";
import { recipeTemplate } from "../../utils/templates";
import Dropdown from "../ui/common/Dropdown";
import RecipeForm from "../views/RecipeForm";
import CreateBookCopyRecipe from "./CreateBookCopyRecipe";

/** Processes recipe data. Context data is passed through here on edit. Else template data.
 * RecipeRequests data (e.g recipe state) is mutable while context data(reference data) is not
 *
 * Component needs to be refactored - separate API request from component logic
 *
 * MainContainer -> RecipeRequests -> [Dropdown, RecipeForm]
 */
function RecipeRequests({
  stateActions,
  closeDialog,
  isOpen,
}: RecipeRequestsProps) {
  const { currentBookId, userId, books, setUserData, currentBook, defaultBookId } =
    useContext(UserContext);
  const { selectedRecipe, setRecipes, setFilteredRecipes } =
    useContext(RecipeContext);

  const [recipeInput, setRecipeInput] = useState<any>(selectedRecipe);
  const [error, setError] = useState<string | null>();
  const [isBookSelectOpen, setIsBookSelectOpen] = useState(false);
  const [render, setRender] = useState<any>({ recipeForm: true });

  const dialogPanelRef = useRef(null);

  /** replaces dialog with dropdown */
  function openBookDropdown() {
    setRender({ dropdown: true });
    setIsBookSelectOpen(true);
  }

  /** Updates state with selected book ID - changes book in UI*/
  async function selectBookId(id: number, book: Book) {
    setUserData((user) => {
      const userData = { ...user };
      userData.currentBookId = id;
      userData.currentBook = {
        book_role: book.book_role,
        book_type: book.book_type,
        description: book.description,
        id: book.id,
        title: book.title,
        is_default_replaced: null
      };
      return userData;
    });
    handleCloseDialog();
  }

  /** Calls API to handle recipe copy and state update in parent. */
  async function copyRecipe(targetBookId: number) {
    const res = await copySharedRecipe(targetBookId, selectedRecipe);
    setRecipes(res);
    setFilteredRecipes(res);
  }

  /** Triggers UI change(switch book) and sequence to copy a recipe */
  function triggerCopy(targetBookId: number, book: Book) {
    selectBookId(targetBookId, book);
    copyRecipe(targetBookId);
  }

  // syncs selected original context recipe with recipe state that tracks input.
  useEffect(() => {
    setRecipeInput(selectedRecipe);
  }, [selectedRecipe.id]);

  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" }); // lg breakpoint in Tailwind

  /**Enables children to update recipeInput state */
  function updateRecipeInput(
    data: string | Ingredient[] | Instruction | Instructions,
    section: string,
  ) {
    setRecipeInput((prevRecipe) => ({ ...prevRecipe, [section]: data }));
  }

  /** Calls API - sends post request with recipe data */
  async function addRecipe() {
    try {
      const filteredRecipe = filterTemplate(recipeInput, recipeTemplate);
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

  /** Calls API - sends edited recipe input*/
  async function editRecipe() {
    try {
      const editedRecipe = filterRecipe(selectedRecipe, recipeInput);
      editedRecipe.created_by_id = selectedRecipe.created_by_id;
      const res = await API.patchUserRecipe(
        currentBookId,
        selectedRecipe.id,
        editedRecipe,
      );
      stateActions.editRecipe(res);
    } catch (error: any) {
      const message = errorHandling("RecipeRequests - editRecipe", error);
      setError(message);
      setTimeout(() => setError(null), 5000);
    }
  }
  /** Calls API - sends delete data for recipe */
  async function deleteRecipe() {
    try {
      const res = await API.deleteUserRecipe(
        userId,
        currentBookId,
        selectedRecipe.id,
        selectedRecipe.created_by_id,
      );
      if (res.message) stateActions.deleteRecipe();
    } catch (error: any) {
      const message = errorHandling("RecipeRequests - deleteRecipe", error);
      setError(message);
      setTimeout(() => setError(null), 5000);
    }
  }

  /** Calls API - removes shared recipe from shared book */
  async function removeSharedRecipe() {
    try {
      const res = await API.deleteSharedRecipe(
        currentBookId,
        selectedRecipe.id,
      );
      if (res.message) stateActions.deleteRecipe();
    } catch (error) {
      const message = errorHandling(
        "RecipeRequests - removeSharedRecipe",
        error,
      );
      setError(message);
      setTimeout(() => setError(null), 5000);
    }
  }

  /** Calls API - sends recipe and book data to copy recipe to recipient's recipe book */
  async function copySharedRecipe(targetBookId: number, recipe: Recipe) {
    try {
      const res = await API.postCopySharedRecipe(targetBookId, recipe);
      return res;
    } catch (error) {
      const message = errorHandling("RecipeRequests - copySharedRecipe", error);
      setError(message);
      setTimeout(() => setError(null), 5000);
    }
  }

  /** handle recipe submit */
  async function submitRecipe(e) {
    e.preventDefault();
    try {
      const res = await addRecipe();
      if (res) closeDialog();
    } catch (error) {
      const message = errorHandling("RecipeRequests - submitRecipe", error);
      setError(message);
      setTimeout(() => setError(null), 5000);
    }
  }

  const recipeAction = {
    submit: submitRecipe,
    remove: removeSharedRecipe,
    delete: deleteRecipe,
    edit: editRecipe,
  };

  /** syncs all closing actions */
  function handleCloseDialog() {
    closeDialog();
    setTimeout(() => {
      // prevents flash of recipe copy controls
      setIsBookSelectOpen(false);
      setRender({ recipeForm: true });
    }, 100);
  }
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
            {render.dropdown && (
              <Dropdown
                options={books}
                onChange={triggerCopy}
                onCreateBook={() => setRender({ createBook: true })}
                render={
                  currentBook.book_type === "shared_inbox" && currentBookId === defaultBookId
                    ? { createBook: true }
                    : { copyRecipe: true }
                }
              />
            )}
            {render.recipeForm && (
              <RecipeForm
                error={error}
                recipeInput={recipeInput}
                onUpdateRecipeInput={updateRecipeInput}
                onOpenBookDropdown={openBookDropdown}
                recipeAction={recipeAction}
              />
            )}
            {render.createBook && (
              <CreateBookCopyRecipe
                isOpen={render.createBook}
                onCloseDialog={handleCloseDialog}
              />
            )}
            {/* </form> */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default RecipeRequests;
