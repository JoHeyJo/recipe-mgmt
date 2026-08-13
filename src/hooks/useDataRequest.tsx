import { useContext, useState } from "react";
import API from "../api";
import { errorHandling } from "../utils/ErrorHandling";
import { Ingredients, Instructions } from "../utils/types";
import { UserContext } from "../context/UserContext";
import { Options } from "../utils/props";

type data = {
  ingredients: Options;
  instructions: Instructions;
};

/** Request data: instructions and ingredients.
 * requestUserData => all user's instructions and ingredients
 * requestBookData => selected book's instructions and ingredients
 *
 * [ComponentsOptionsRequests, InstructionsRequests]
 */
function useDataRequest() {
  const [data, setDate] = useState<data>();
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [error, setError] = useState("");
  const [isBookSource, setIsBookSource] = useState<boolean>(true);
  const { currentBookId } = useContext(UserContext);

  /** Fetch instructions and ingredients associated to User */
  async function requestUserData() {
    try {
      const res = await API.getUserData();
      setIngredients(res.ingredients);
      setInstructions(res.instructions);
      console.log("user data===!", res);
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
      setIngredients(res.ingredients);
      setInstructions(res.instructions);
    } catch (error: any) {
      const message = errorHandling("useDataRequest - requestBookData", error);
      setError(message);
    }
  }

  /** Toggles boolean value
   * default value = True
   */
  function toggleSource() {
    setIsBookSource((source) => !source);
  }

  /** Triggers Book data request or User data request
   * default = User data
   */
 async function requestData() {
    return isBookSource ? requestUserData() : requestBookData();
  }

  return { data, requestData, toggleSource, isBookSource };
}
export default useDataRequest;
