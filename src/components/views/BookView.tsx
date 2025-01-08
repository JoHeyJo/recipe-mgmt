import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import MultiSelect from "../ui/common/Dropdown";

function BookView() {
  const {books} = useContext(UserContext);
  return (
    <section>
      <MultiSelect />
    </section>
  )
}

export default BookView;