import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import MultiSelect from "../ui/common/MultiSelect";
import useLocalStorage from "../../hooks/useLocalStorage";
import CreateBook from "../requests/CreateBook";
import { BookViewProp } from "../../utils/props";
import FaShareButton from "../ui/common/FaShareButton";
import { errorHandling } from "../../utils/ErrorHandling";

/** Facilitates rendering books & book selection
 *
 * MainContainer -> BookView -> MultiSelect
 */
function BookView({ resetSelected }: BookViewProp) {
  const { defaultBook, books, setUserData } = useContext(UserContext);
  const [bookId, setBookId] = useLocalStorage("current-book-id");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentBook = books.find((book) => book.id === +bookId) || defaultBook;

  /** Set selected book id & reset selected book to default */
  function selectBook(id: number) {
    setUserData((user) => {
      const userData = { ...user };
      userData.currentBookId = id;
      setBookId(id);
      return userData;
    });
    resetSelected();
  }

  function handleShare(){

    console.log("Book #",bookId,"shared")
    // try {
    // } catch (error: any) {
    //   errorHandling("BookView -> handleShare", error);
    //   throw error;
    // }
  }

  return (
    <section>
      {!currentBook && !bookId ? (
        <>
          {/* Model */}
          <CreateBook isOpen={isModalOpen} setOpen={setIsModalOpen} />
          <button onClick={() => setIsModalOpen(true)}>Create Book</button>
        </>
      ) : (
        <>
          <MultiSelect
            selected={currentBook}
            options={books}
            handleIdChange={selectBook}
          />
          <FaShareButton handleClick={handleShare} />
        </>
      )}
    </section>
  );
}

export default BookView;
