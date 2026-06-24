import { Book } from "../../utils/types";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import CreateBook from "./CreateBook";
import { CreateBookCopyRecipeProps } from "../../utils/types";
import { RecipeContext } from "../../context/RecipeContext";
import { changeBook } from "../../utils/functions";

/** Handles requests for user to create a new book  
 * Request book creation associated to user
 *
 *
 * RecipeRequests -> CreateBookCopyRecipe -> CreateBook
 */
function CreateBookCopyRecipe({
  isOpen,
  onCloseDialog,
}: CreateBookCopyRecipeProps) {
  const [bookId, setBookId] = useLocalStorage("current-book-id");

  const { setUserData } = useContext(UserContext);
  const { selectedRecipe, setFilteredRecipes, setRecipes } = useContext(RecipeContext);


  /** Calls POST request book creation and recipe copy */
  async function createBookCopyRecipe(bookData: Book) {
    try {
      const { book, recipes } = await API.postCreateBookCopyRecipe(
        bookData,
        selectedRecipe,
      );

      changeBook(setBookId, setUserData, book)
      setFilteredRecipes(recipes);
      setRecipes(recipes)
      return book;
    } catch (error: any) {
      throw errorHandling("CreateBookRequests - createBookCopyRecipe", error);
    }
  }


  /** Handles book creation and recipe copy */

  return (
    <CreateBook
      isOpen={isOpen}
      onCloseDialog={onCloseDialog}
      createBook={createBookCopyRecipe}
    />
  );
}
export default CreateBookCopyRecipe;
