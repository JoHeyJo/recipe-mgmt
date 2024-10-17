// import "../../styles/RecipeContainer.css"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AddRecipe from "../requests/AddRecipe"
import { Recipe } from "../../utils/types"
import RecipeView from "./RecipeView"

type RecipeViewProps = {
  handleRecipesUpdate: (recipe: Recipe) => void;
}

/** Renders recipe "book"
 * 
 * 
 * MainContainer -> RecipeContainer -> AddRecipe
 */

function RecipeContainer({ handleRecipesUpdate }: RecipeViewProps) {
  const [open, setOpen] = useState(false)

  return (
    <div id="RecipeContainer-container" className="divide-y border-2 border-blue-900 container mx-auto flex-1">
      <div id="RecipeContainer-header">
        <h3>Recipe</h3>
        <button onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <AddRecipe handleRecipesUpdate={handleRecipesUpdate} setShowing={setOpen} isOpen={open} />
      </div>
      <RecipeView />
    </div>
  )
}

export default RecipeContainer
