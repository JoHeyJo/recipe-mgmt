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
import SharePopOut from "../ui/common/SharePopOut";
import FaShareButton from "../ui/common/FaShareButton";
import { WebSocketProvider } from "../../context/WebSocketProvider";

/** Renders the main container (book) housing list of recipes and individual recipe
 *
 * RoutesList -> MainContainer -> [RecipeRequests, RecipeContainer, RecipesList, BookView, Search]
 */
function MainContainer() {
  const { userId, defaultBookId, currentBookId, currentBook, user } =
    useContext(UserContext);

  const [selectedBookId, setSelectedBookId] = useState<number>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipe] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(recipeTemplate);
  const [isOpen, setOpen] = useState(false);
  const [requestAction, setRequestAction] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log("User data in main",user, currentBook)

  const recipeData = {
    recipeId: selectedRecipe.id,
    created_by_id: selectedRecipe.created_by_id,
    recipeName: selectedRecipe.name,
    contextIngredients: selectedRecipe.ingredients,
    contextInstructions: selectedRecipe.instructions,
    selectedNotes: selectedRecipe.notes,
    requestAction,
    updateRecipes,
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
    setOpen(false);
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
  }

  if (!isLoading) <div>Loading...</div>;

  return (
    <div className="border-4 mt-7 bg-primary mx-auto max-w-7xl xl:px-8 xl:border-2">
      {/* <div className="w-[1350px] h-[819px] absolute overflow-hidden -translate-x-2/4 p-0 border-[3px] "> */}
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div
        id="MainContainer-container"
        className="border-2 bg-primary h-[75vh] flex min-h-0"
      >
        {/* Does recipes need to be reduced to just ids and title??? */}
        <RecipeContext.Provider value={recipeData}>
          <WebSocketProvider>
            <section
              id="MainContainer-leftpage"
              className="flex-1 flex flex-col min-h-0"
            >
              <div id="MainContainer-header">
                <RecipeRequests
                  isShared={currentBook?.book_type === "shared_inbox"}
                  recipeActions={recipeActions}
                  setShowing={toggleModel}
                  isOpen={isOpen}
                />

                <SharePopOut
                  action={"shareBook"}
                  isDialogOpen={isDialogOpen}
                  closeDialog={closeDialogPanel}
                />

                <div className="flex p-1 font-semibold text-lg border-b-2">
                  <div className="flex flex-1 justify-start">Recipes for:</div>
                  <section className="flex flex-1 justify-start">
                    <BookView resetSelected={resetSelectedRecipe} />
                  </section>
                  {defaultBookId && (
                    <section className="flex [flex:0.5] justify-center">
                      <FaShareButton
                        handleClick={() => setIsDialogOpen(true)}
                      />
                    </section>
                  )}
                  {defaultBookId && (
                    <section className="flex [flex:2] justify-center">
                      <Search list={recipes} setList={filterRecipes} />
                    </section>
                  )}
                  {defaultBookId && (
                    <section className="flex [flex:0.5] justify-center">
                      <FaPlusButton onAction={toggleCreateForm} />
                    </section>
                  )}
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
          </WebSocketProvider>
          <section
            id="MainContainer-rightpage"
            className="overflow-y-auto divide-y border-x-2 mx-auto flex-1"
          >
            <RecipeContainer
              recipe={selectedRecipe}
              handleModalToggle={toggleEditTemplate}
            />
          </section>
        </RecipeContext.Provider>
      </div>
    </div>
  );
}

export default MainContainer;
