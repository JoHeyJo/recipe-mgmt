import { useState } from "react";
import API from "../api";
import { errorHandling } from "../utils/ErrorHandling";
import { Ingredients, Instructions } from "../utils/types";

/** Request data: instructions and ingredients.
 * requestUserData => all user's instructions and ingredients
 * requestBookData => selected book's instructions and ingredients
 */
function useDataRequest() {
  const [data, setDate] = useState<Ingredients | Instructions>([])
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [error, setError] = useState("");
  const [isUserSource, setIsUserSource] = useState(true);

  /** Fetch instructions and ingredients associated to User */
  async function requestUserData() {
    try {
      const res = await API.getUserData();
      setIngredients(res.ingredients);
      setInstructions(res.instructions);
      console.log("user data!")
    } catch (error: any) {
      const message = errorHandling("useDataRequest - requestUserData", error);
      setError(message);
    }
  }

  /** Fetch instructions and ingredients associated to Book */
  async function requestBookData() {
    try {
      const res = await API.getUserData();
      setIngredients(res.ingredients);
      setInstructions(res.instructions);
      console.log("book data!")
    } catch (error: any) {
      const message = errorHandling("useDataRequest - requestBookData", error);
      setError(message);
    }
  }

  /** Toggles boolean value
   * default value = True
   */
  function toggleSource(){
    setIsUserSource((source) => !source)
  }

  /** Triggers Book data request or User data request
   * default = User data
   */
  function requestData() {
    return isUserSource ? requestUserData() : requestBookData();
  }

  return [data, requestData, toggleSource, isUserSource] as const;
}
export default useDataRequest;
