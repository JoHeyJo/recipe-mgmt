import { useState, FormEvent, ChangeEvent } from "react";
import InputWithLabelForm from "../views/InputWithLabelForm";
import { PillButtonSubmit } from "../ui/PillButtonSubmit";

/** Invite form component - renders  Pop Out UI that allows ADMIN to invite testers
 * 
 * 
 * PopOut -> Invite -> [InputWithLabelForm, PillButtonSubmit]
*/
function Invite() {
  const [tester, setTester] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
  }
  
  function handleChange(event: ChangeEvent<HTMLInputElement>){
    setTester(event.target.value)
  }

  return (
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
  );
}

export default Invite;
