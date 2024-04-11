import "../styles/RecipeView.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function RecipeView() {
  return (
    <div id="RecipeView-container" className="divide-y border-2 border-blue-900 container mx-auto px-4 sm:px-6 lg:px-8 flex-1">
      <div id="RecipeView-header">
        <h3>Recipe</h3>
        <button>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <p >Recipe View</p>
    </div>
  )
}

export default RecipeView
