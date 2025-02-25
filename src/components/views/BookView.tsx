import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import MultiSelect from "../ui/common/MultiSelect";
import useLocalStorage from "../../hooks/useLocalStorage";
import CreateBook from "../requests/CreateBook";

/** Facilitates rendering books & book selection
 * 
 * MainContainer -> BookView -> MultiSelect
  */
function BookView() {
  const { defaultBook, books, setUserData } = useContext(UserContext);
  const [bookId, setBookId] = useLocalStorage("current-book-id");
  const [isModalOpen, setIsModalOpen] = useState(false)

  const currentBook = books.filter(book => book.id === +bookId)[0] || defaultBook;
  console.log("current book", currentBook)

  /** Set current book id */
  function selectBook(id: number) {
    setUserData(user => {
      const userData = { ...user };
      userData.currentBookId = id;
      setBookId(id);
      return userData;
    });
  }

  return (
    <section>
      {!defaultBook && books.length === 0
        ?
        <>
        {/* Model */}
          <CreateBook isOpen={isModalOpen} setOpen={setIsModalOpen} />
          <button onClick={()=>setIsModalOpen(true)}>Create Book</button>
        </>
        :
        <MultiSelect defaultOption={currentBook.title} options={books} selectOption={selectBook} />
      }
    </section>
  )
}

export default BookView;