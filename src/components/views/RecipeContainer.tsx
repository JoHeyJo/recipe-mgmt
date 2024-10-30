// import "../../styles/RecipeContainer.css"
import { useState } from "react"

import RecipeView from "./RecipeView"
import { RecipeViewProps } from "../../utils/props"
import FaPlusButton from "../ui/common/FaPlusButton"

/** Renders recipe "book"
 * 
 * 
 * MainContainer -> RecipeContainer -> AddRecipe
 */

function RecipeContainer({ handleRecipesUpdate, recipe}: RecipeViewProps) {


  return (
    <div id="RecipeContainer-container" className="divide-y border-2 border-blue-900 mx-auto flex-1">
      <div id="RecipeContainer-header" className="flex justify-between p-4">
        <h3 className="font-semibold leading-7">Recipe:</h3>
        <h2>{recipe.name}</h2>
        {/* <FaPlusButton onAction={() => setOpen(true)} /> */}
      </div>
      <RecipeView recipe={recipe} />
    </div>
  )
}

export default RecipeContainer
