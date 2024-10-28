// import "../../styles/RecipeContainer.css"
import { useState } from "react"
import AddRecipe from "../requests/AddRecipe"
import RecipeView from "./RecipeView"
import { RecipeViewProps } from "../../utils/props"
import FaPlusButton from "../ui/common/FaPlusButton"

/** Renders recipe "book"
 * 
 * 
 * MainContainer -> RecipeContainer -> AddRecipe
 */

function RecipeContainer({ handleRecipesUpdate, recipe }: RecipeViewProps) {
  const [open, setOpen] = useState(false)

  return (
    <div id="RecipeContainer-container" className="divide-y border-2 border-blue-900 container mx-auto flex-1">
      <div id="RecipeContainer-header" className="flex text-gray-900 justify-between p-4">
        <h3 className="font-semibold leading-7 text-gray-900">Recipe:</h3>
        <h2>{recipe.name}</h2>
        <FaPlusButton onAction={() => setOpen(true)} />
      </div>
      <AddRecipe handleRecipesUpdate={handleRecipesUpdate} setShowing={setOpen} isOpen={open} />
      <RecipeView recipe={recipe} />
    </div>
  )
}

export default RecipeContainer
