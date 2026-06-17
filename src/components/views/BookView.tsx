import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Dropdown from "../ui/common/Dropdown";
import useLocalStorage from "../../hooks/useLocalStorage";
import CreateBook from "../requests/CreateBook";
import { BookViewProp } from "../../utils/props";
import { Book } from "../../utils/types";

/** Facilitates rendering books & book selection
 *
 * MainContainer -> BookView -> [CreateBook, Dropdown]
 */
function BookView({ resetSelected }: BookViewProp) {
  const { books, setUserData, currentBook } = useContext(UserContext);
  const [isCreateBookOpen, setIsCreateBookOpen] = useState(false);
  const [bookId, setBookId] = useLocalStorage("current-book-id");

  /** Set selected book id & reset selected book to default */
  function onSelectBook(id: number, selected: Book) {
    setUserData((user) => {
      const userData = { ...user };
      userData.currentBookId = id;
      userData.currentBook = selected;
      setBookId(id);
      return userData;
    });
    resetSelected();
  }

  function closeCreateBook() {
    setIsCreateBookOpen(false);
  }

  return (
    <section>
      {!currentBook && !bookId ? (
        <>
          {/* Model */}
          <CreateBook
            isOpen={isCreateBookOpen}
            onCloseModal={closeCreateBook}
          />
          <button onClick={() => setIsCreateBookOpen(true)}>Create Book</button>
        </>
      ) : (
        <>
          <Dropdown
            selected={currentBook}
            options={books}
            onChange={onSelectBook}
          />
        </>
      )}
    </section>
  );
}

export default BookView;
