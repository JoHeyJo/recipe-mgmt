import RecipesList from "../views/RecipesList"
import { UserContext } from "../../auth/UserContext";
import { useContext, useEffect, useState } from "react";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";
import { Recipe } from "../../utils/types";
import RecipeContainer from "../views/RecipeContainer";
import { recipeTemplate } from "../../utils/templates";
import FaPlusButton from "../ui/common/FaPlusButton"
import AddRecipe from "../requests/AddRecipe";
/** Renders the main container housing list of recipes and individual recipe
 * 
 * RoutesList -> MainContainer -> [Recipes, RecipeContainer]
 */

function MainContainer() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(recipeTemplate)
  const [open, setOpen] = useState(false)

  const { userId, currentBookId } = useContext(UserContext);

  /**Update rendered recipes after creation */
  function updateRecipes(recipe: Recipe) {
    setRecipes(recipes => [...recipes, recipe])
  }

  /** Change selected recipe */
  function selectRecipe(index: number) {
    setSelectedRecipe(recipes[index])
  }

  /** Handles model toggle */
  function toggleModel() {
    setOpen(!open);
  }

  useEffect(() => {
    async function fetchUserRecipes() {
      try {
        const res = await API.getUserRecipes(userId, currentBookId);
        setRecipes(res);
      } catch (error: any) {
        errorHandling("MainContainer -> fetchUserRecipes", error);
      }
    }
    fetchUserRecipes();
  }, [])

  return (
    <div className="border-2 mt-7 border-red-900 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="border-2 border-black-500 h-[75vh] mx-auto max-w-1xl flex">
        {/* Does recipes need to be reduced to just ids and title??? */}
        <section id="RecipesList-container" className="flex-1">
          {false
            ?
            <AddRecipe recipeTemplate={recipeTemplate} handleRecipesUpdate={updateRecipes} setShowing={toggleModel} isOpen={open} />
            :
            <AddRecipe recipeTemplate={selectedRecipe} handleRecipesUpdate={updateRecipes} setShowing={toggleModel} isOpen={open} />
          }
          <div className="flex justify-between m-1">
            <div>Recipes</div>
            <FaPlusButton onAction={toggleModel} />
          </div>
          <RecipesList recipes={recipes} handleSelect={selectRecipe} />
        </section>

        <RecipeContainer recipe={selectedRecipe} handleRecipesUpdate={updateRecipes} handleModal={toggleModel} isOpen={open} />
      </div>
    </div>
  )
}

export default MainContainer;