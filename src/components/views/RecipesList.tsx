import { useState } from "react";
import "../../styles/Recipes.css";
import { RecipesListProps } from "../../utils/props";
import SharePopOut from "../ui/common/SharePopOut";
import RecipeListItem from "../ui/RecipeListItem";
import useWebSocket from "../../hooks/useWebSocket";

/** Renders list of recipes that can be selected for view
 *
 *
 * MainContainer -> RecipesList -> [SharePopOut, RecipeListItem]
 */
function RecipesList({ recipes, handleSelect, selectedId }: RecipesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const webSocketAPI = useWebSocket();

  /** Close Share recipe Dialog panel */
  function closeDialogPanel() {
    setIsDialogOpen(false);
    // state setter is delayed until Dialog fades out
    setTimeout(() => {
      webSocketAPI.resetMessage();
    }, 310);
  }

  /** Open share recipes Dialog panel */
  function openDialogPanel(){
    setIsDialogOpen(true)
  }

  return (
    <section>
      <div>
        <SharePopOut
          action={"shareRecipe"}
          webSocket={webSocketAPI}
          isDialogOpen={isDialogOpen}
          handleClose={closeDialogPanel}
        />
      </div>
      <ul
        // className="h-full overflow-y-scroll"
        role="list"
        id="Recipes-container"
      >
        {recipes.map(({ name, id }, index) => (
          <RecipeListItem
            name={name}
            index={index}
            recipeId={selectedId}
            id={id}
            handleSelect={handleSelect}
            handleOpen={openDialogPanel}
          />
        ))}
      </ul>
    </section>
  );
}

export default RecipesList;
