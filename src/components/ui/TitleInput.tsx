import InputWithLabel from "./common/InputWithLabel";
import { RecipeInfoProp } from "../../utils/props";
import { useState, useContext, useEffect } from "react";
import { RecipeContext } from "../../context/RecipeContext";

/** Consolidations recipe data and logic
 * 
 * 
 */
function TitleInput({ handleUpdate }: RecipeInfoProp) {
  const { recipeId, recipeName, requestAction } = useContext(RecipeContext);
  const [title, setTitle] = useState(recipeName);

  /** Updates parent component with title data */
  function updateTitle(){
    handleUpdate(title, "name")
  }

  /** Handles changes to title state */
  function handleChange(e){
    const value = e.target.value;
    setTitle(value)
  }

  /** Updates parent state with current changes to title state */
  useEffect(()=>{
    updateTitle()
  },[title])

  return (
    <InputWithLabel
      id={recipeId.toString()}
      name={recipeName}
      value={requestAction === "edit" ? title : null}
      type={"title"}
      handleUpdate={handleChange}
      placeholder={"Awesome recipe name!"} />
  )
}

export default TitleInput;