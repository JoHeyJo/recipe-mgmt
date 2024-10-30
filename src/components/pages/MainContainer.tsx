import RecipesList from "../views/RecipesList"
import { UserContext } from "../../auth/UserContext";
import { useContext, useEffect, useState } from "react";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";
import { Recipe } from "../../utils/types";
import RecipeContainer from "../views/RecipeContainer";
import { recipeTemplate } from "../../utils/templates";

/** Renders the main container housing list of recipes and individual recipe
 * 
 * RoutesList -> MainContainer -> [Recipes, RecipeContainer]
 */

function MainContainer() {
  const [recipes, setRecipes] = useState([]);
  console.log("recipes",recipes)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(recipeTemplate)

  const { userId, currentBookId } = useContext(UserContext);

  /**Update rendered recipes after creation */
  function updateRecipes(recipe: Recipe) {
    setRecipes(recipes => [...recipes, recipe])
  }

  /** Change selected recipe */
  function selectRecipe(index: number) {
    setSelectedRecipe(recipes[index])
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
        <RecipesList recipes={recipes} handleSelect={selectRecipe} />
        <RecipeContainer recipe={selectedRecipe} handleRecipesUpdate={updateRecipes} />
      </div>
    </div>
  )
}

export default MainContainer;