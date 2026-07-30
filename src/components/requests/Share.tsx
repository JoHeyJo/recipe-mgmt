import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import { errorHandling } from "../../utils/ErrorHandling";
import InputWithLabelForm from "../views/InputWithLabelForm";
import { PillButtonSubmit } from "../ui/PillButtonSubmit";
import { ShareBookProp } from "../../utils/props";
import { WebSocketContext } from "../../context/WebSocketContext";
import RadioSwitch from "../ui/common/RadioSwitch";
import PopOut from "../ui/common/PopOut";

/** Handles User request to share book/recipe with recipient
 *
 * MainContainer -> Share -> PopOut -{ [InputWithLabelForm, PillButtonSubmit]
 */
function Share({ action, isDialogOpen, onCloseDialogPanel }: ShareBookProp) {
  const [user, setUser] = useState("");
  const [privileges, setRecipient] = useState("viewer");

  const { sendBook, sendRecipe, message, resetMessage } =
    useContext(WebSocketContext);

  /** handle state change for recipient */
  function handleRadio(event: ChangeEvent<HTMLInputElement>) {
    setRecipient(event.target.value);
  }

  /** Facilitates change in user name */
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setUser(value);
  }

  /** Post request to share User book with recipient */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      // should user be passed or gathered from context
      action === "shareBook" ? sendBook(user, privileges) : sendRecipe(user);
    } catch (error: any) {
      errorHandling("Share -> handleSubmit", error);
      throw error;
    }
  }

  function handleResetMessage(){
    resetMessage();
    setUser("");
  }

  return (
    <PopOut
      isDialogOpen={isDialogOpen}
      onCloseDialog={onCloseDialogPanel}
      message={message}
      onResetMessage={handleResetMessage}
    >
      <form onSubmit={handleSubmit}>
        <div>{`Who would you like to share this ${action === "shareBook" ? "book" : "recipe"} with?`}</div>
        {action === "shareBook" && (
          <RadioSwitch
            handleSwitch={handleRadio}
            selection={privileges}
            labelOne="Collaborator"
            labelTwo="View Only"
            valueOne="collaborator"
            valueTwo="viewer"
          />
        )}
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
      </form>
    </PopOut>
  );
}

export default Share;
