import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import MultiSelect from "../ui/common/MultiSelect";
import useLocalStorage from "../../hooks/useLocalStorage";

/** Facilitates rendering books & book selection
 * 
 * MainContainer -> BookView -> MultiSelect
  */
function BookView() {
  const { defaultBook, books, setUserData } = useContext(UserContext);
  const [bookId, setBookId] = useLocalStorage("current-book-id");

  /** Set current book id */
  function selectBook(id: number){
    setUserData(user => {
      const userData = {...user};
      userData.currentBookId = id;
      setBookId(id);
      return userData;
    });
  }

  return (
    <section>
      <MultiSelect defaultOption={defaultBook} options={books} selectOption={selectBook} />
    </section>
  )
}

export default BookView;