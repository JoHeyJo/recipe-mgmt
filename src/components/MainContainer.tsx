import RecipeView from "./RecipeView";
import Recipes from "./Recipes"

function MainContainer() {
  return (
    <div className="border-2 border-black-500 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="border-2 border-black-500 mx-auto max-w-1xl flex">
        <Recipes />
        <RecipeView />
      </div>
    </div>
  )
}

export default MainContainer;