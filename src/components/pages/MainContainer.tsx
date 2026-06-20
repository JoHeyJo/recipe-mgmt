import RecipesList from "../views/RecipesList";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";
import { Recipe, Recipes, requestAction } from "../../utils/types";
import RecipeContainer from "../views/RecipeContainer";
import { recipeTemplate } from "../../utils/templates";
import RecipeRequests from "../requests/RecipeRequests";
import { RecipeContext } from "../../context/RecipeContext";
import BookView from "../views/BookView";
import Search from "../ui/Search";
import SharePopOut from "../ui/common/SharePopOut";
import { WebSocketProvider } from "../../context/WebSocketProvider";
import BookControls from "../ui/controls/BookControls";

/** Renders the main container (book) housing list of recipes and individual recipe
 *
 * RoutesList -> MainContainer -> [RecipeRequests, RecipeContainer, RecipesList, BookView, SharePopOut, Search, BookControls]
 */
function MainContainer() {
  const { userId, defaultBookId, currentBookId, PRIVILEGES } =
    useContext(UserContext);

  const [recipes, setRecipes] = useState<Recipes | any>([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(recipeTemplate);
  const [isOpen, setOpen] = useState(false);
  const [requestAction, setRequestAction] = useState<requestAction | object>(
    {},
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const recipeData = {
    recipes,
    selectedRecipe: {
      id: selectedRecipe.id,
      created_by_id: selectedRecipe.created_by_id,
      name: selectedRecipe.name,
      ingredients: selectedRecipe.ingredients,
      instructions: selectedRecipe.instructions,
      notes: selectedRecipe.notes,
    },
    setRecipes,
    requestAction,
    updateRecipes,
    setFilteredRecipes,
  };

  /** Updates rendered recipes after creation */
  function updateRecipes(recipe: Recipe) {
    setRecipes((recipes) => [...recipes, recipe]);
  }

  /** Handles recipe edit action: updates recipes & re-selects updated recipe. */
  async function editRecipe(editedRecipe: Recipe) {
    setOpen(false);
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        editedRecipe.id === recipe.id ? editedRecipe : recipe,
      ),
    );
    setSelectedRecipe(editedRecipe);
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
  function closeDialog() {
    setOpen(false);
  }

  /** Triggers actions that renders RecipeRequests with appropriate data/controls set - current recipe */
  function openRecipeModal() {
    PRIVILEGES.sharedInbox
      ? setRequestAction({ copy: true })
      : setRequestAction({ edit: true });
    setOpen(true);
  }

  /** Triggers actions that renders RecipeRequests with empty data - no recipe */
  function toggleCreateForm() {
    setSelectedRecipe(recipeTemplate);
    setRequestAction({ create: true });
    setOpen(!isOpen);
  }

  // Removes recipes selection
  function resetSelectedRecipe() {
    setSelectedRecipe(recipeTemplate);
  }

  /** Filter recipes */
  function filterRecipes(filteredRecipes: Recipe[]) {
    setFilteredRecipes(filteredRecipes);
  }

  const stateActions = {
    updateRecipes,
    deleteRecipe,
    editRecipe,
  };

  /** Loads user recipes when user data is populated */
  useEffect(() => {
    async function fetchUserRecipes() {
      try {
        const res = await API.getBookRecipes(userId, currentBookId);
        setRecipes(res);
        setFilteredRecipes(res);
      } catch (error: any) {
        errorHandling("MainContainer -> fetchUserRecipes", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (currentBookId) {
      fetchUserRecipes();
    }
  }, [currentBookId, userId]);

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
                  stateActions={stateActions}
                  closeDialog={closeDialog}
                  isOpen={isOpen}
                />

                <SharePopOut
                  action={"shareBook"}
                  isDialogOpen={isDialogOpen}
                  closeDialog={closeDialogPanel}
                />

                <div className="flex p-1 font-semibold text-lg border-b-2">
                  <div className="flex [flex:0.75]">
                    <div className="flex flex-1 justify-start">
                      Recipes for:
                    </div>
                    <section className="flex flex-1 justify-start">
                      <BookView resetSelected={resetSelectedRecipe} />
                    </section>
                  </div>
                  {defaultBookId && (
                    <BookControls
                      shareControl={() => setIsDialogOpen(true)}
                      addControl={toggleCreateForm}
                      render={!!defaultBookId}
                    >
                      <Search list={recipes} setList={filterRecipes} />
                    </BookControls>
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
              handleModalToggle={openRecipeModal}
            />
          </section>
        </RecipeContext.Provider>
      </div>
    </div>
  );
}

export default MainContainer;
