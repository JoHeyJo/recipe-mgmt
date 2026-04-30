import RecipeView from "./RecipeView";
import { RecipeViewProps } from "../../utils/props";
import { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { UserContext } from "../../context/UserContext";
import RecipeControls from "../ui/RecipeControls";

/** Renders recipe
 *
 *
 * MainContainer -> RecipeContainer -> RecipeView
 */

function RecipeContainer({ recipe, handleModalToggle }: RecipeViewProps) {
  const { recipeId } = useContext(RecipeContext);
  const { currentBook } = useContext(UserContext);
  return (
    <div id="RecipeContainer-container">
      <div id="RecipeContainer-header" className="flex justify-between p-1">
        <h3 className="font-semibold text-lg">Recipe:</h3>
        <h2 className="font-semibold text-lg">{recipe.name}</h2>
        {recipeId !== 0 && (
          <RecipeControls
            role={currentBook.book_role}
            type={currentBook.book_type}
            action={handleModalToggle}
          />
        )}
      </div>
      <RecipeView recipe={recipe} />
    </div>
  );
}

export default RecipeContainer;
