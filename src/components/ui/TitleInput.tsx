import TextInput from "./common/TextInput";
import { RecipeInfoProp } from "../../utils/props";
import { useState, useContext, useEffect } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import FormLabel from "./common/Label";
import { Field } from "@headlessui/react";

/** Consolidations recipe data and logic
 *
 * RecipeRequests -> TitleInput -> TextInput
 */
function TitleInput({ onTitleInput }: RecipeInfoProp) {
  const { id, name } = useContext(RecipeContext).selectedRecipe;
  const [title, setTitle] = useState(name);

  /** Updates parent component with title data */
  function updateTitle() {
    onTitleInput(title, "name");
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
    <Field className="pb-2">
      <FormLabel label={"Title:"} />
      <TextInput
        id={id.toString()}
        name={name}
        value={title}
        type={"title"}
        onUpdate={handleChange}
        placeholder={"Recipe name: Margarita"}
      />
    </Field>
  );
}

export default TitleInput;
