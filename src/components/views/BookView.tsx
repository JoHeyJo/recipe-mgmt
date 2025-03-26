import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import MultiSelect from "../ui/common/MultiSelect";
import useLocalStorage from "../../hooks/useLocalStorage";
import CreateBook from "../requests/CreateBook";
import { BookViewProp } from "../../utils/props";
 
/** Facilitates rendering books & book selection
 * 
 * MainContainer -> BookView -> MultiSelect
  */
function BookView({ resetSelected, defaultBookId }: BookViewProp ) {
  const { defaultBook, books, setUserData } = useContext(UserContext);
  const [bookId, setBookId] = useLocalStorage("current-book-id");
  const [isModalOpen, setIsModalOpen] = useState(false)
  console.log("book id",bookId)

  const currentBook = books.find(book => book.id === +bookId) || defaultBook;

  /** Set selected book id & reset selected book to default */
  function selectBook(id: number) {
    setUserData(user => {
      const userData = { ...user };
      userData.currentBookId = id;
      setBookId(id);
      return userData;
    });
    resetSelected()
  }

  if(!defaultBookId) return <></>
  
  return (
    <section>
      {bookId === undefined
        ?
        <>
        {/* Model */}
          <CreateBook isOpen={isModalOpen} setOpen={setIsModalOpen} />
          <button onClick={()=>setIsModalOpen(true)}>Create Book</button>
        </>
        :
        <MultiSelect option={currentBook.title} options={books} handleIdChange={selectBook} />
      }
    </section>
  )
}

export default BookView;