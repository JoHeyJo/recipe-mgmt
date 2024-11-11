import RecipesList from "../views/RecipesList"
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";
import { Recipe } from "../../utils/types";
import RecipeContainer from "../views/RecipeContainer";
import { recipeTemplate } from "../../utils/templates";
import FaPlusButton from "../ui/common/FaPlusButton"
import AddRecipe from "../requests/AddRecipe";
import { RecipeContext } from "../../context/RecipeContext";
/** Renders the main container housing list of recipes and individual recipe
 * 
 * RoutesList -> MainContainer -> [AddRecipe(RecipeRequests), RecipeContainer, RecipesList]
 */
function MainContainer() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(recipeTemplate)
  const [isOpen, setOpen] = useState(false)
  const [requestAction, setRequestAction] = useState<string>("")

  const { userId, currentBookId } = useContext(UserContext);

  const recipeData = {
    recipeId: selectedRecipe.id,
    recipeName: selectedRecipe.name,
    contextIngredients: selectedRecipe.ingredients,
    contextInstructions: selectedRecipe.instructions,
    selectedNotes: selectedRecipe.notes,
    requestAction
  }

  /**Update rendered recipes after creation */
  function updateRecipes(recipe: Recipe) {
    setRecipes(recipes => [...recipes, recipe])
  }

  /** Change selected recipe */
  function selectRecipe(index: number) {
    setSelectedRecipe(recipes[index])
  }

  /** Model toggle function for children components */
  function toggleModel() {
    setOpen(!isOpen);
    // resets action when modal is closed 
    setRequestAction("")
  }

  /** Triggers actions that render AddRecipe with appropriate data set - no recipe data*/
  // function renderAddTemplate() {
  //   setRequestAction("add")
  //   setOpen(!isOpen);
  // }

  /** Triggers actions that renders AddRecipe with appropriate data set - current recipe */
  function toggleEditTemplate() {
    setRequestAction("edit")
    setOpen(!isOpen);
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
          <RecipeContext.Provider value={recipeData}>
            <AddRecipe recipeTemplate={recipeTemplate} handleRecipesUpdate={updateRecipes} setShowing={toggleModel} isOpen={isOpen} />
          </RecipeContext.Provider >
          <div className="flex justify-between m-1">
            <div>Recipes</div>
            <FaPlusButton onAction={()=>setOpen(true)} />
          </div>
          <RecipesList recipes={recipes} handleSelect={selectRecipe} />
        </section>

        <RecipeContainer recipe={selectedRecipe} handleRecipesUpdate={updateRecipes} handleModalToggle={toggleEditTemplate} isOpen={isOpen} />
      </div>
    </div>
  )
}

export default MainContainer;