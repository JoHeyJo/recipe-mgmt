import RecipeView from "./RecipeView";
import { RecipeViewProps } from "../../utils/props";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { UserContext } from "../../context/UserContext";

/** Renders recipe
 *
 *
 * MainContainer -> RecipeContainer -> RecipeView
 */

function RecipeContainer({
  recipe,
  handleModalToggle,
  isOpen,
}: RecipeViewProps) {
  const { recipeId } = useContext(RecipeContext);
  const { currentBook } =useContext(UserContext)

  return (
    <div id="RecipeContainer-container">
      <div id="RecipeContainer-header" className="flex justify-between p-1">
        <h3 className="font-semibold text-lg">Recipe:</h3>
        <h2 className="font-semibold text-lg">{recipe.name}</h2>
        <button
          onClick={handleModalToggle}
          className="font-semibold leading-7 ml-1 hover:text-text-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-zinc-600"
        > 
          {/* Doesn't render PenToSquare if user is not owner of book or when a recipe is not selected */}
          {currentBook.book_role === "owner" && recipeId !== 0 ? <FontAwesomeIcon icon={faPenToSquare} /> : <></>}
        </button>
      </div>
      <RecipeView recipe={recipe} />
    </div>
  );
}

export default RecipeContainer;
