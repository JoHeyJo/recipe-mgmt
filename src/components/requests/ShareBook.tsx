import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { errorHandling } from "../../utils/ErrorHandling";
import API from "../../api";
import InputWithLabelForm from "../views/InputWithLabelForm";
import { PillButtonSubmit } from "../ui/PillButtonSubmit";
import { UserContext } from "../../context/UserContext";
import useWebSocket from "../../hooks/useWebSocket";

/** Handles User request to share book with recipient 
 * 
 * PopOutAlert -> ShareBook -> [InputWithLabelForm, PillButtonSubmit]
*/
function ShareBook() {
  const [user, setUser] = useState("");
  const [response, setResponse] = useState(null);
  useWebSocket();

  const { userId, currentBookId } = useContext(UserContext);

  /** Facilitates change in user name */
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setUser(value);
  }

  /** Post request to share User book with recipient */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const { message } = await API.postShareBook(userId, currentBookId, {
        recipient: user,
      });
      setResponse(message);
    } catch (error: any) {
      errorHandling("BookView -> shareBookWithUser", error);
      throw error;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {response ? (
        response
      ) : (
        <>
        <div>Who would you like to share this book with?</div>
          <InputWithLabelForm
            type={"user-name"}
            name={"User Name:"}
            id={"user-name"}
            className={"user-name"}
            handleChange={handleChange}
            value={user}
            required={true}
            styles={"px-2 border-2 border-solid"}
          />
          <PillButtonSubmit action={"share"} />
        </>
      )}
    </form>
  );
}

export default ShareBook;
