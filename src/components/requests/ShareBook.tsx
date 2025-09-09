import { useState, ChangeEvent, FormEvent } from "react";
import PopOutAlert from "../ui/common/PopOutAlert";
import { errorHandling } from "../../utils/ErrorHandling";
import API from "../../api";
import { ShareBookProps } from "../../utils/props";
import { PillButton } from "../ui/PillButton";
import InputWithLabelForm from "../views/InputWithLabelForm";

/** Handles User request to share book with recipient */
function ShareBook({closePanel}: ShareBookProps) {
  const [user, setUser] = useState("");

  /** Facilitates change in user name */
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setUser(value);
  }

  /** Post request to share User book with recipient */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    console.log("submit");
    event.preventDefault();
    try {
      // const res = await API.postShareBook(userId, currentBookId, {
      //   recipient: user,
      // });
      closePanel();
      console.log("submit");
    } catch (error: any) {
      errorHandling("BookView -> shareBookWithUser", error);
      throw error;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <PillButton action={"share"} />
    </form>
  );
}

export default ShareBook;
