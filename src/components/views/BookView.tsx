import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import MultiSelect from "../ui/common/MultiSelect";
import useLocalStorage from "../../hooks/useLocalStorage";
import CreateBook from "../requests/CreateBook";
import { BookViewProp } from "../../utils/props";
import { Book } from "../../utils/types";

/** Facilitates rendering books & book selection
 *
 * MainContainer -> BookView -> [CreateBook, MultiSelect]
 */
function BookView({ resetSelected }: BookViewProp) {
  const { books, setUserData, currentBook } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookId, setBookId] = useLocalStorage("current-book-id");

  /** Set selected book id & reset selected book to default */
  function selectBook(id: number, selected: Book) {
    setUserData((user) => {
      const userData = { ...user };
      userData.currentBookId = id;
      userData.currentBook = selected;
      setBookId(id);
      return userData;
    });
    resetSelected();
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
        </>
      )}
    </section>
  );
}

export default BookView;
