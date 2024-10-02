import RecipeView from "../views/RecipeView";
import Recipes from "../views/Recipes"
import { UserContext } from "../../auth/UserContext";
import { useContext } from "react";

/** Renders the main container housing list of recipes and individual recipe
 * 
 * RoutesList -> MainContainer -> [Recipes,RecipeView]
 */

function MainContainer() {

  const userData = useContext(UserContext);
  console.log("user data in main container",userData)
  return (

    <div className="border-2 mt-7 border-red-900 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="border-2 border-black-500 h-[75vh] mx-auto max-w-1xl flex">
        <Recipes />
        <RecipeView />
      </div>
    </div>
  )
}

export default MainContainer;