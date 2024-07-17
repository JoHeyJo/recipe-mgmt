import "../styles/RecipeView.css"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from "./AddRecipe"

function RecipeView() {
  const [open, setOpen] = useState(true)

  return (
    <div id="RecipeView-container" className="divide-y border-2 border-blue-900 container mx-auto px-4 sm:px-6 lg:px-8 flex-1">
      <div id="RecipeView-header">
        <h3>Recipe</h3>
        <button onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <Modal setShowing={setOpen} isOpen={open} />
      </div>
      <p >Recipe View</p>
    </div>
  )
}

export default RecipeView
