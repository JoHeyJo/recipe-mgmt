import RecipeView from "./RecipeView";
import { RecipeViewProps } from "../../utils/props";
import { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import RecipeControls from "../ui/controls/RecipeControls";

/** Renders recipe
 *
 *
 * MainContainer -> RecipeContainer -> RecipeView
 */

function RecipeContainer({ recipe, handleModalToggle }: RecipeViewProps) {
  const { selectedRecipe } = useContext(RecipeContext);
  return (
    <div id="RecipeContainer-container">
      <div id="RecipeContainer-header" className="flex justify-between p-1">
        <h3 className="font-semibold text-lg">Recipe:</h3>
        <h2 className="font-semibold text-lg">{recipe.name}</h2>
        {selectedRecipe.id !== 0 && <RecipeControls action={handleModalToggle} />}
      </div>
      <RecipeView recipe={recipe} />
    </div>
  );
}

export default RecipeContainer;
