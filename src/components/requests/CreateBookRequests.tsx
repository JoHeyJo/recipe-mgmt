import { useState, FormEvent } from "react";
import { Book } from "../../utils/types";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import CreateBook from "./CreateBook";

type CreateBookRequests = {
  isOpen: boolean;
  onCloseDialog: (bookId: number) => void;
};

const defaultBook = {
  id: null,
  title: "",
  description: "",
  book_role: "",
  book_type: "",
};
/** Renders modal that holds book information
 * Request book creation associated to user
 *
 *
 * [TopNav, BookVIew, RecipeRequests] -> CreateBookRequests -> [TextInputTitle, TextInputDescription]
 */
function CreateBookRequests({ isOpen, onCloseDialog }) {
  const [bookData, setBookData] = useState<Book>(defaultBook);
  const [alert, setAlert] = useState("");
  const [bookId, setBookId] = useLocalStorage("current-book-id");

  const { userId, setUserData } = useContext(UserContext);

  /** Handles changes to book data form */
  // function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
  //   const { name, value } = event.target;
  //   setBookData((bookData) => {
  //     const updatedBook = { ...bookData };
  //     updatedBook[name] = value;
  //     return updatedBook;
  //   });
  // }

  /** Post request to create new book */
  async function createBook(bookData: Book, userId: number) {
    try {
      const newBook = await API.postBook(bookData, userId);
      setUserData((user) => {
        const updatedUser = { ...user };
        updatedUser.books.push(newBook);
        // ensure default book id
        if (!updatedUser.defaultBookId) {
          updatedUser.defaultBook = newBook;
          updatedUser.defaultBookId = newBook.id;
        }
        // triggers UI to change to new book
        updatedUser.currentBook = newBook;
        updatedUser.currentBookId = newBook.id;
        // updates localStorage
        setBookId(newBook.id);
        return updatedUser;
      });
      return newBook;
    } catch (error: any) {
      errorHandling("CreateBookRequests - createBook", error);
    }
  }

  /** Handles book creation and recipe copy */

  /** Handle submitting action */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newBook = await createBook(bookData, userId);
    if (newBook.is_default_replaced)
      setAlert(
        `Your new recipe book, "${newBook.title}" will be set as the default`,
      );
    if (!newBook.is_default_replaced) handleClosingOnSubmit(newBook.id);
  }


  return (
    <CreateBook isOpen={false} onCloseDialog={()=>{}} createBook={()=>{}}/>
  );
}
export default CreateBookRequests;
