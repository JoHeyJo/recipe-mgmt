import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import MultiSelect from "../ui/common/MultiSelect";

function BookView() {
  const { books } = useContext(UserContext);

  /** Get book request */
  function fetchBook(userId, BookId){

  }
  return (
    <section>
      <MultiSelect options={books} />
    </section>
  )
}

export default BookView;