// import "../../styles/RecipeContainer.css"
import RecipeView from "./RecipeView"
import { RecipeViewProps } from "../../utils/props"
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/** Renders recipe "book"
 * 
 * 
 * MainContainer -> RecipeContainer -> AddRecipe
 */

function RecipeContainer({ handleRecipesUpdate, recipe }: RecipeViewProps) {


  return (
    <div id="RecipeContainer-container" className="divide-y border-2 border-blue-900 mx-auto flex-1">
      <div id="RecipeContainer-header" className="flex justify-between p-4">
        <h3 className="font-semibold leading-7">Recipe:</h3>
        <h2>{recipe.name}</h2>
        <FontAwesomeIcon onClick={() => { }} icon={faPenToSquare} />
      </div>
      <RecipeView recipe={recipe} />
    </div>
  )
}

export default RecipeContainer
