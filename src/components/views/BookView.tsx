import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import MultiSelect from "../ui/common/MultiSelect";

function BookView() {
  const { books } = useContext(UserContext);
  console.log("bboks", books)
  return (
    <section>
      <MultiSelect books={books} />
    </section>
  )
}

export default BookView;