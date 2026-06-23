import { Book } from "../../utils/types";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import CreateBook from "./CreateBook";
import { CreateBookRequestsProps } from "../../utils/types";
import { changeBook } from "../../utils/functions";

/** Handles requests for user to create a new book
 * Request book creation associated to user
 *
 *
 * [TopNav, BookVIew] -> CreateBookRequests -> CreateBook
 */
function CreateBookRequests({
  isOpen,
  onCloseDialog,
}: CreateBookRequestsProps) {
  const [bookId, setBookId] = useLocalStorage("current-book-id");

  const { userId, setUserData } = useContext(UserContext);

  /** Calls post request to create new book */
  async function createBook(bookData: Book) {
    try {
      const newBook = await API.postBook(bookData, userId);
      changeBook(setBookId, setUserData, newBook);
      return newBook;
    } catch (error: any) {
      errorHandling("CreateBookRequests - createBook", error);
    }
  }

  /** Handles book creation and recipe copy */

  return (
    <CreateBook
      isOpen={isOpen}
      onCloseDialog={onCloseDialog}
      createBook={createBook}
    />
  );
}
export default CreateBookRequests;
