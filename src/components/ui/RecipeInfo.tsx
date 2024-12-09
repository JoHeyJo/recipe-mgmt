import InputWithLabel from "./InputWithLabel";
import { RecipeInfoProp } from "../../utils/props";
import { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";

/** Consolidations recipe data
 * 
 * 
 */
function RecipeInfo({handleUpdate}: RecipeInfoProp){
  const { recipeId, recipeName, requestAction } = useContext(RecipeContext);

  return (
    <InputWithLabel 
      id={recipeId.toString()} 
      name={recipeName} 
      value={requestAction === "edit" ? recipeName : null} 
      type={"title"} 
      handleUpdate={handleUpdate} 
      placeholder={"Awesome recipe name!"} />
  )
}

export default RecipeInfo;