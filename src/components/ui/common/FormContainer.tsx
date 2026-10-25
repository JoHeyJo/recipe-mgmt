import { useState } from "react";
import InstructionsRequests from "../../requests/InstructionsRequests";
import IngredientsGroup from "../../selectors/IngredientsGroup";
import NotesInput from "../NotesInput";
import TitleInput from "../TitleInput";
import Alert from "../Alert";

export default function FormContainer() {
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    // Root: fills its parent. Parent must have a real height (h-screen, h-full, or a grid/flex track).
    <>

    </>
  );
}
