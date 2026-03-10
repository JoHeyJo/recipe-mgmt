import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import { errorHandling } from "../../utils/ErrorHandling";
import InputWithLabelForm from "../views/InputWithLabelForm";
import { PillButtonSubmit } from "../ui/PillButtonSubmit";
import { ShareBookProp } from "../../utils/props";
import useWebSocket from "../../hooks/useWebSocket";

/** Handles User request to share book/recipe with recipient
 * Calls on custom hook to establish WebSocket connection and communication
 *
 * SharePopOut -> Share -> [InputWithLabelForm, PillButtonSubmit]
 */
function Share({ webSocketAPI, action }: ShareBookProp) {
  const [user, setUser] = useState("");
  const [response, setResponse] = useState(null);

  const { message, sendBook, sendRecipe } = useWebSocket();

  /** Facilitates change in user name */
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setUser(value);
  }

  /** Post request to share User book with recipient */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      action === "shareBook"
        ? sendBook(user)
        : sendRecipe(user);
    } catch (error: any) {
      errorHandling("Share -> handleSubmit", error);
      throw error;
    }
  }

  useEffect(() => {
    console.log("In Share message:", message);
    console.log("In Share webSocketAPI.message:", webSocketAPI.message);
    setResponse(webSocketAPI.message);
    console.log("REsponse:", response);
  }, [message]);

  console.log("in Share:", message);

  return (
    <form onSubmit={handleSubmit}>
      {response ? (
        response
      ) : (
        <>
          <div>{`Who would you like to share this ${action === "shareBook" ? "book" : "recipe"} with?`}</div>
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

export default Share;
