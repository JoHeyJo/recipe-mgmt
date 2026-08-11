import { useState } from "react";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";
imoprt errorHandling

/** Request all of a users's instructions and ingredients OR all instructions and
 * ingredients corresponding to a book
 */
function UserBookDataRequest() {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  async function requestUserData() {
    try {
      const res = await API.getUserData();
      setIngredients(res.ingredients);
      setInstructions(res.instructions);
    } catch (error: any) {
      const message = errorHandling("UserBookDataRequest - requestUserData", error);
      setError(message);
    }
  }
}
export default UserBookDataRequest;
