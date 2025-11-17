import RecipesList from "../views/RecipesList";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";
import { Recipe } from "../../utils/types";
import RecipeContainer from "../views/RecipeContainer";
import { recipeTemplate } from "../../utils/templates";
import FaPlusButton from "../ui/common/FaPlusButton";
import RecipeRequests from "../requests/RecipeRequests";
import { RecipeContext } from "../../context/RecipeContext";
import BookView from "../views/BookView";
import Search from "../ui/Search";
import useWebSocket from "../../hooks/useWebSocket";
import PopOutAlert from "../ui/common/PopOutAlert";
import FaShareButton from "../ui/common/FaShareButton";
import PasswordRecovery from "../PasswordRecovery";

/** Renders the main container (book) housing list of recipes and individual recipe
 *
 * RoutesList -> MainContainer -> [RecipeRequests, RecipeContainer, RecipesList, BookView, Search]
 */
function MainContainer() {
  const { userId, defaultBookId, currentBookId, setUserData } =
    useContext(UserContext);

  const [selectedBookId, setSelectedBookId] = useState<number>();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipe] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(recipeTemplate);
  const [isOpen, setOpen] = useState(false);
  const [requestAction, setRequestAction] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const webSocketAPI = useWebSocket();

  const recipeData = {
    recipeId: selectedRecipe.id,
    recipeName: selectedRecipe.name,
    contextIngredients: selectedRecipe.ingredients,
    contextInstructions: selectedRecipe.instructions,
    selectedNotes: selectedRecipe.notes,
    requestAction,
  };

  /** Updates rendered recipes after creation */
  function updateRecipes(recipe: Recipe) {
    setRecipes((recipes) => [...recipes, recipe]);
  }

  /** Handles recipe edit action: requests updated recipes, re-selects updated recipe. */
  async function editRecipe() {
    setOpen(false);
    const res = await API.getBookRecipes(userId, selectedBookId);
    for (let recipe of res) {
      if (recipe.id === selectedRecipe.id) setSelectedRecipe(recipe);
    }
    setRecipes(res);
  }

  /** Removes recipe from list after deletion */
  function deleteRecipe() {
    const id = selectedRecipe.id;
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
    setSelectedRecipe(recipeTemplate);
  }

  /** Change selected recipe */
  function selectRecipe(index: number) {
    setSelectedRecipe(filteredRecipes[index]);
  }

  /** Model toggle function for children components */
  function toggleModel() {
    setOpen(!isOpen);
  }

  /** Triggers actions that renders RecipeRequests with appropriate data set - current recipe */
  function toggleEditTemplate() {
    setRequestAction("edit");
    setOpen(!isOpen);
  }

  /** Triggers actions that renders RecipeRequests with empty data - no recipe */
  function toggleCreateForm() {
    setSelectedRecipe(recipeTemplate);
    setRequestAction("");
    setOpen(!isOpen);
  }

  function resetSelectedRecipe() {
    setSelectedRecipe(recipeTemplate);
  }

  /** Filter recipes */
  function filterRecipes(filteredRecipes: Recipe[]) {
    setFilteredRecipe(filteredRecipes);
  }

  const recipeActions = {
    updateRecipes,
    deleteRecipe,
    editRecipe,
  };

  /** Loads user recipes when user data is populated */
  useEffect(() => {
    async function fetchUserRecipes() {
      try {
        const res = await API.getBookRecipes(userId, selectedBookId);
        setRecipes(res);
        setFilteredRecipe(res);
      } catch (error: any) {
        errorHandling("MainContainer -> fetchUserRecipes", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedBookId) {
      fetchUserRecipes();
    }
  }, [selectedBookId, userId]);

  /** Updates current book selection */
  useEffect(() => {
    setSelectedBookId(currentBookId || defaultBookId);
  }, [currentBookId]);

  /** Close Share book Dialog panel */
  function closeDialogPanel() {
    setIsDialogOpen(false);
    // state setter is delayed until Dialog fades out
    setTimeout(() => {
      webSocketAPI.resetMessage();
    }, 310);
  }

  /** Mange webSocket side effects */
  useEffect(() => {
    /** On successful communication and share with server update list of books  */
    async function updateWithSharedBook() {
      const res = webSocketAPI.data;
      setUserData((data) => ({ ...data, books: res }));
    }
    if (webSocketAPI.status == 200) {
      updateWithSharedBook();
      setTimeout(() => {
        setIsDialogOpen(true);
      }, 310);
    }
  }, [webSocketAPI.status]);

  if (!isLoading) <div>Loading...</div>;

  return (
    <div className="border-4 mt-7 bg-primary mx-auto max-w-7xl xl:px-8 xl:border-2">
      {/* <div className="w-[1350px] h-[819px] absolute overflow-hidden -translate-x-2/4 p-0 border-[3px] "> */}
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div
        id="MainContainer-container"
        className="border-2 bg-primary h-[75vh] flex min-h-0"
      >
        <PasswordRecovery onRequestReset={null} onResetPassword={null}/>
        {/* Does recipes need to be reduced to just ids and title??? */}
        <RecipeContext.Provider value={recipeData}>
          <section
            id="MainContainer-leftpage"
            className="flex-1 flex flex-col min-h-0"
          >
            <div id="MainContainer-header">
              <RecipeRequests
                recipeActions={recipeActions}
                setShowing={toggleModel}
                isOpen={isOpen}
              />
              <div className="flex justify-between p-1 font-semibold text-lg border-b-2">
                <div>Recipes for:</div>
                <BookView resetSelected={resetSelectedRecipe} />
                <PopOutAlert
                  api={webSocketAPI}
                  isDialogOpen={isDialogOpen}
                  handleClose={closeDialogPanel}
                />
                <FaShareButton handleClick={() => setIsDialogOpen(true)} />
                <Search list={recipes} setList={filterRecipes} />
                <FaPlusButton onAction={toggleCreateForm} />
              </div>
            </div>
            <div
              id="MainContainer-recipes"
              className="flex-1 overflow-y-auto min-h-0"
            >
              <RecipesList
                recipes={filteredRecipes}
                handleSelect={selectRecipe}
                selectedId={selectedRecipe.id}
              />
            </div>
          </section>
          <section
            id="MainContainer-rightpage"
            className="overflow-y-auto divide-y border-x-2 mx-auto flex-1"
          >
            <RecipeContainer
              recipe={selectedRecipe}
              handleModalToggle={toggleEditTemplate}
              isOpen={isOpen}
            />
          </section>
        </RecipeContext.Provider>
      </div>
    </div>
  );
}

export default MainContainer;
