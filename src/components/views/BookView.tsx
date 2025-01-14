import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import MultiSelect from "../ui/common/MultiSelect";

/** Facilitates rendering books & book selection
 * 
 * MainContainer -> BookView
  */
function BookView() {
  const { defaultBookId, books, setUserData } = useContext(UserContext);

  /** Set current book id */
  function selectBook(id: number){
    setUserData(user => {
      const userData = {...user};
      userData.currentBookId = id;
      return userData;
    });
  }

  /**  */

  return (
    <section>
      <MultiSelect defaultOptionId={defaultBookId} options={books} selectOption={selectBook} />
    </section>
  )
}

export default BookView;