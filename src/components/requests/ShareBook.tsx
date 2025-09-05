import { useState } from "react";
import PopOutAlert from "../ui/common/PopOutAlert";

function ShareBookWithUser({isOpen, togglePanel}) {
  const [user, setUser] = useState("");
  return <PopOutAlert isDialogOpen={isOpen} handleClose={togglePanel} />;  
}

export default ShareBookWithUser;