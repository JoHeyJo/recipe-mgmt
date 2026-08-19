import { useContext, useState } from "react";
import API from "../api";
import { errorHandling } from "../utils/ErrorHandling";
import { IngredientOptions, Instructions } from "../utils/types";
import { UserContext } from "../context/UserContext";

type data = {
  ingredients: IngredientOptions;
  instructions: Instructions;
};

/** Request data: instructions and ingredients.
 * requestUserData => all user's instructions and ingredients
 * requestBookData => selected book's instructions and ingredients
 *
 * [ComponentsOptionsRequests, InstructionsRequests]
 */
function useDataRequest() {
  const [error, setError] = useState("");
  const [isBookSource, setIsBookSource] = useState<boolean>(true);
  const { currentBookId } = useContext(UserContext);

  /** Fetch instructions and ingredients associated to User */
  async function requestUserData() {
    try {
      const res = await API.getUserData();
      console.log("user data===!", res);
      return res;
    } catch (error: any) {
      const message = errorHandling("useDataRequest - requestUserData", error);
      setError(message);
    }
  }

  /** Fetch instructions and ingredients associated to Book */
  async function requestBookData() {
    try {
      const res = await API.getBookData(currentBookId);
      console.log("book data!::::", res);
      return res;
    } catch (error: any) {
      const message = errorHandling("useDataRequest - requestBookData", error);
      setError(message);
    }
  }

  /** Toggles boolean value - default value = True
   */
  function toggleSource() {
    console.log("toggled")
    setIsBookSource((source) => !source);
    requestData();
  }

  /** Triggers Book data request or User data request
   * default = User data
   */
  async function requestData() {
    return isBookSource ? requestBookData() : requestUserData();
  }

  return { requestData, isBookSource, toggleSource };
}
export default useDataRequest;
