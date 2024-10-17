import RecipeView from "../views/RecipeView";
import Recipes from "../views/Recipe"
import { UserContext } from "../../auth/UserContext";
import { useContext, useEffect, useState } from "react";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";
import { Recipe } from "../../utils/types";

/** Renders the main container housing list of recipes and individual recipe
 * 
 * RoutesList -> MainContainer -> [Recipes,RecipeView]
 */

function MainContainer() {
  const [recipes, setRecipes] = useState([]);

  const { userId, currentBookId } = useContext(UserContext);

  /**Update rendered recipes after creation */
  function updateRecipes(recipe: Recipe) {
    setRecipes(recipes => [...recipes, recipe])
  }

  useEffect(() => {
    async function fetchUserRecipes() {
      try {
        const res = await API.getUserRecipes(userId, currentBookId);
        setRecipes(res);
      } catch (error: any) {
        errorHandling("MainContainer->fetchUserRecipes", error);
      }
    }
    fetchUserRecipes();
  }, [])

  return (
    <div className="border-2 mt-7 border-red-900 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="border-2 border-black-500 h-[75vh] mx-auto max-w-1xl flex">
        <ul role="list" id="Recipes-container" className="border-2 border-blue-900 divide-y divide-gray-200 flex-1">
          {recipes.map((recipe) => (
            <Recipes id={recipe.id} name={recipe.name} />
          ))}
        </ul>
        <RecipeView handleRecipesUpdate={updateRecipes}/>
      </div>
    </div>
  )
}

export default MainContainer;