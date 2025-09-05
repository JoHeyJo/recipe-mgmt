import { useState, ChangeEvent } from "react";
import PopOutAlert from "../ui/common/PopOutAlert";
import { errorHandling } from "../../utils/ErrorHandling";
import API from "../../api";
import { ShareBookProps } from "../../utils/props";

function ShareBook({
  isOpen,
  togglePanel,
  userId,
  currentBookId,
}: ShareBookProps) {
  const [user, setUser] = useState("");

  /** Facilitates change in user name */
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setUser(value);
  }

  async function shareBookWithUser() {
    try {
      const res = await API.postShareBook(userId, currentBookId, {
        recipient: user,
      });
      console.log(res);
    } catch (error: any) {
      errorHandling("BookView -> shareBookWithUser", error);
      throw error;
    }
  }

  return (
    <form>
      <PopOutAlert
        text={"Who would you like to share this book with?"}
        isDialogOpen={isOpen}
        handleClose={togglePanel}
        handleChange={handleChange}
        value={user}
      />
    </form>
  );
}

export default ShareBook;
