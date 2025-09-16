import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import { errorHandling } from "../../utils/ErrorHandling";
import InputWithLabelForm from "../views/InputWithLabelForm";
import { PillButtonSubmit } from "../ui/PillButtonSubmit";
import { ShareBookProp } from "../../utils/props";

/** Handles User request to share book with recipient
 *
 * PopOutAlert -> ShareBook -> [InputWithLabelForm, PillButtonSubmit]
 */
function ShareBook({ webSocketAPI }: ShareBookProp) {
  const [user, setUser] = useState("");
  const [response, setResponse] = useState(null);

  /** Facilitates change in user name */
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setUser(value);
  }

  /** Post request to share User book with recipient */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      webSocketAPI.sendMessage(user);
    } catch (error: any) {
      errorHandling("BookView -> shareBookWithUser", error);
      throw error;
    }
  }

  useEffect(()=>{
    setResponse(webSocketAPI.message)
    console.log("response:",response)
  },[webSocketAPI.message])

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
