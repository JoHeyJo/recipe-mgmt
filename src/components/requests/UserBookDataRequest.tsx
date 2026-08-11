import { useState } from "react";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";

/** Request all of a users's instructions and ingredients OR all instructions and
 * ingredients corresponding to a book
 */
function UserBookDataRequest() {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [error, setError] = useState("");

  /** Fetch instructions and ingredients associated to User */
  async function requestUserData() {
    try {
      const res = await API.getUserData();
      setIngredients(res.ingredients);
      setInstructions(res.instructions);
    } catch (error: any) {
      const message = errorHandling(
        "UserBookDataRequest - requestUserData",
        error,
      );
      setError(message);
    }
  }

  /** Fetch instructions and ingredients associated to Book */
  async function requestBookData() {
    try {
      const res = await API.getUserData();
      setIngredients(res.ingredients);
      setInstructions(res.instructions);
    } catch (error: any) {
      const message = errorHandling(
        "UserBookDataRequest - requestBookData",
        error,
      );
      setError(message);
    }
  }
}
export default UserBookDataRequest;
