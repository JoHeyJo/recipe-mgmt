import RecipeView from "./RecipeView"
import { RecipeViewProps } from "../../utils/props"
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from "react"
import { RecipeContext } from "../../context/RecipeContext"

/** Renders recipe "book"
 * 
 * 
 * MainContainer -> RecipeContainer -> RecipeRequests
 */

function RecipeContainer({ recipe, handleModalToggle }: RecipeViewProps) {

  const { recipeId } = useContext(RecipeContext);

  return (
    <div id="RecipeContainer-container" className="divide-y border-2 border-blue-900 mx-auto flex-1">
      <div id="RecipeContainer-header" className="flex justify-between p-4">
        <h3 className="font-semibold leading-7">Recipe:</h3>
        <h2>{recipe.name}</h2>
        <button
          onClick={handleModalToggle}
          className="font-semibold leading-7 ml-1 hover:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-zinc-600"              >
          {recipeId !== 0 ? <FontAwesomeIcon icon={faPenToSquare}/> : <></> }
        </button>
      </div>
      <RecipeView recipe={recipe} />
    </div>
  )
}

export default RecipeContainer
