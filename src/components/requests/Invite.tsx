import { useState, FormEvent, ChangeEvent } from "react";
import InputWithLabelForm from "../views/InputWithLabelForm";
import { PillButtonSubmit } from "../ui/PillButtonSubmit";
import PopOut from "../ui/common/PopOut";

/** Invite form component - renders  Pop Out UI that allows ADMIN to invite testers
 *
 *
 * TopNav -> Invite -> PopOut -{ InputWithLabelForm, PillButtonSubmit }
 */
function Invite({isDialogOpen, onCloseDialogPanel}) {
  const [tester, setTester] = useState("");
  const [message, setMessage] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("submit")
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setTester(event.target.value);
  }

  function handleResetMessage(){
    setTester("");
    setMessage("");
  }

  return (
    <PopOut
      isDialogOpen={isDialogOpen}
      onCloseDialog={onCloseDialogPanel}
      message={message}
      onResetMessage={handleResetMessage}
    >
      <form onSubmit={handleSubmit}>
        <InputWithLabelForm
          type={"email"}
          name={"Email:"}
          id={"email"}
          className={"email"}
          handleChange={handleChange}
          value={tester}
          required={true}
          styles={"px-2 border-2 border-solid"}
        />
        <PillButtonSubmit action={"invite"} />
      </form>
    </PopOut>
  );
}

export default Invite;
