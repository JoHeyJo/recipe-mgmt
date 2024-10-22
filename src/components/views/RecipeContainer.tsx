// import "../../styles/RecipeContainer.css"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AddRecipe from "../requests/AddRecipe"
import { Recipe } from "../../utils/types"
import RecipeView from "./RecipeView"
import { RecipeViewProps } from "../../utils/props"

/** Renders recipe "book"
 * 
 * 
 * MainContainer -> RecipeContainer -> AddRecipe
 */

function RecipeContainer({ handleRecipesUpdate, recipe }: RecipeViewProps) {
  const [open, setOpen] = useState(false)

  return (
    <div id="RecipeContainer-container" className="divide-y border-2 border-blue-900 container mx-auto flex-1">
      <div id="RecipeContainer-header" className="flex text-gray-900 bg-white justify-between p-4">
          <h3>Recipe</h3>
          <button onClick={() => setOpen(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <AddRecipe handleRecipesUpdate={handleRecipesUpdate} setShowing={setOpen} isOpen={open} />
        <RecipeView recipe={recipe} />
    </div>
  )
}

export default RecipeContainer
