import { Book } from "../../utils/types";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import CreateBook from "./CreateBook";
import { CreateBookCopyRecipeProps } from "../../utils/types";
import { RecipeContext } from "../../context/RecipeContext";

/** Handles requests for user to create a new book  
 * Request book creation associated to user
 *
 *
 * [TopNav, BookVIew] -> CreateBookCopyRecipe -> CreateBook
 */
function CreateBookCopyRecipe({
  isOpen,
  onCloseDialog,
}: CreateBookCopyRecipeProps) {
  const [bookId, setBookId] = useLocalStorage("current-book-id");

  const { userId, setUserData } = useContext(UserContext);
  const { selectedRecipe } = useContext(RecipeContext);

  /** Calls POST request book creation and recipe copy */
  function createBookCopyRecipe(bookData: Book) {
    const {book, recipe} = API.postCreateBookCopyRecipe(bookData, selectedRecipe, userId);
    
    try {
    } catch (error: any) {
      throw errorHandling("CreateBookRequests - createBookCopyRecipe", error);
    }
  }

  // /** Post request to create new book */
  // async function createBook(bookData: Book) {
  //   try {
  //     const newBook = await API.postBook(bookData, userId);
  //     setUserData((user) => {
  //       const updatedUser = { ...user };
  //       updatedUser.books.push(newBook);
  //       // ensure default book id
  //       if (!updatedUser.defaultBookId) {
  //         updatedUser.defaultBook = newBook;
  //         updatedUser.defaultBookId = newBook.id;
  //       }
  //       // triggers UI to change to new book
  //       updatedUser.currentBook = newBook;
  //       updatedUser.currentBookId = newBook.id;
  //       // updates localStorage
  //       setBookId(newBook.id);
  //       return updatedUser;
  //     });
  //     return newBook;
  //   } catch (error: any) {
  //     errorHandling("CreateBookCopyRecipe - createBook", error);
  //   }
  // }

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
