import TextInput from "./common/TextInput";
import { RecipeInfoProp } from "../../utils/props";
import { useState, useContext, useEffect } from "react";
import { RecipeContext } from "../../context/RecipeContext";

/** Consolidations recipe data and logic
 *
 * RecipeRequests -> TitleInput -> TextInput
 */
function TitleInput({ handleUpdate }: RecipeInfoProp) {
  const { recipeId, recipeName } = useContext(RecipeContext);
  const [title, setTitle] = useState(recipeName);

  /** Updates parent component with title data */
  function updateTitle() {
    handleUpdate(title, "name");
  }

  /** Handles changes to title state */
  function handleChange(e) {
    const value = e.target.value;
    setTitle(value);
  }

  /** handles parent state changes */
  useEffect(() => {
    updateTitle();
  }, [title]);

  return (
    <TextInput
      id={recipeId.toString()}
      name={recipeName}
      value={title}
      type={"title"}
      handleUpdate={handleChange}
      placeholder={"Awesome recipe name!"}
    />
  );
}

export default TitleInput;
