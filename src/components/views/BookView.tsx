import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import MultiSelect from "../ui/common/MultiSelect";

/** Facilitates rendering books & selection of book
 * 
 * MainContainer -> BookView
  */
function BookView() {
  const { books, setUserData } = useContext(UserContext);

  /** Set current book id */
  function selectBook(id: number){
    setUserData(user => {
      const userData = {...user};
      userData.currentBookId = id;
      return userData;
    });
  }

  return (
    <section>
      <MultiSelect options={books} setOption={selectBook} />
    </section>
  )
}

export default BookView;