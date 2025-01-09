import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import MultiSelect from "../ui/common/MultiSelect";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";

function BookView() {
  const { books, setUserData } = useContext(UserContext);

  /** Get book request */
  async function fetchBook(userId: number, bookId: number) {
    try {
      const res = await API.getBookRecipe(userId, bookId)
      setUserData((user) => {
        const userData = {...user};
        userData.books = res;
        return userData
      })
    } catch (error) {
      errorHandling("BookView -> fetchBook", error)
    }

  }
  return (
    <section>
      <MultiSelect options={books} />
    </section>
  )
}

export default BookView;