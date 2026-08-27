import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Dropdown from "../ui/common/Dropdown";
import PopOut from "../ui/common/PopOut";
import { errorHandling } from "../../utils/ErrorHandling";

/** Request component - move recipe to selected recipe book
 *
 * RecipesList -> RecipeMove -> PopOut -{Dropdown}
 */
function RecipeMove({ isDialogOpen, onCloseDialogPanel }) {
  const { books, currentBook } = useContext(UserContext);
  // const [error, setError] = useState("");

  /** Request to move recipe to selected recipe book */
  function requestMoveRecipe() {
    try {
      console.log("request recipe move")
    } catch (error) {
      const message = errorHandling("RecipeRequests - submitRecipe", error);
      // setError(message);
      // setTimeout(() => setError(null), 5000);
    }
  }
  return (
    <PopOut isDialogOpen={isDialogOpen} onCloseDialog={onCloseDialogPanel}>
      <Dropdown
        options={books}
        onChange={requestMoveRecipe}
        render={{ viewBooks: true }}
        selected={currentBook}
      />
    </PopOut>
  );
}

export default RecipeMove;
