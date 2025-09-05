import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import MultiSelect from "../ui/common/MultiSelect";
import useLocalStorage from "../../hooks/useLocalStorage";
import CreateBook from "../requests/CreateBook";
import { BookViewProp } from "../../utils/props";
import FaShareButton from "../ui/common/FaShareButton";
import ShareBook from "../requests/ShareBook";

/** Facilitates rendering books & book selection
 *
 * MainContainer -> BookView -> [CreateBook, MultiSelect, FaShareButton, ShareBookWithUser]
 */
function BookView({ resetSelected }: BookViewProp) {
  const { userId, defaultBook, books, setUserData } = useContext(UserContext);
  const [bookId, setBookId] = useLocalStorage("current-book-id");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  /** Toggles Alert panel */
  function toggleDialogPanel() {
    setIsDialogOpen(!isDialogOpen);
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
          <ShareBook
            isOpen={isDialogOpen}
            togglePanel={toggleDialogPanel}
            userId={userId}
            currentBookId={currentBook.id}
          />
          <MultiSelect
            selected={currentBook}
            options={books}
            handleIdChange={selectBook}
          />
          <FaShareButton handleClick={() => setIsDialogOpen(true)} />
        </>
      )}
    </section>
  );
}

export default BookView;
