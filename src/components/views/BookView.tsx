import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import MultiSelect from "../ui/common/MultiSelect";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";

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