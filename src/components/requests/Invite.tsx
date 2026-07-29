import { useState, FormEvent, ChangeEvent } from "react";
import InputWithLabelForm from "../views/InputWithLabelForm";
import { PillButtonSubmit } from "../ui/PillButtonSubmit";

/** Invite form component - renders  Pop Out UI that allows ADMIN to invite testers
 * 
 * 
 * SharePopOut -> Invite
*/
function Invite() {
  const [tester, setTester] = useState("");

  function handleSubmit(){

  }
  
  function handleChange(event: ChangeEvent<HTMLInputElement>){
    setTester(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
    {/* <div>{`Who would you like to share this ${action === "shareBook" ? "book" : "recipe"} with?`}</div> */}
      <InputWithLabelForm
        type={"user-name"}
        name={"User Name:"}
        id={"user-name"}
        className={"user-name"}
        handleChange={handleChange}
        value={tester}
        required={true}
        styles={"px-2 border-2 border-solid"}
      />
      <PillButtonSubmit action={"share"} />
    </form>
  );
}

export default Invite;
