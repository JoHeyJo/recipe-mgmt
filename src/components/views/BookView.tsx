import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import MultiSelect from "../ui/common/MultiSelect";
import useLocalStorage from "../../hooks/useLocalStorage";
import CreateBook from "../requests/CreateBook";
import { BookViewProp } from "../../utils/props";
import FaShareButton from "../ui/common/FaShareButton";
import PopOutAlert from "../ui/common/PopOutAlert";

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

  /** Toggles Share Book Dialog panel */
  function toggleDialogPanel() {
    setIsDialogOpen(!isDialogOpen);
  }

  /** Close Share book Dialog panel */
  function closeDialogPanel(){
    setIsDialogOpen(false);
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
          <PopOutAlert
            text={"Who would you like to share this book with?"}
            isDialogOpen={isDialogOpen}
            handleClose={closeDialogPanel}
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
