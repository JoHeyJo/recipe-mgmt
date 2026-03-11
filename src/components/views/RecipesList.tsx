import { useContext, useState, useEffect } from "react";
import "../../styles/Recipes.css";
import { RecipesListProps } from "../../utils/props";
import SharePopOut from "../ui/common/SharePopOut";
import RecipeListItem from "../ui/RecipeListItem";
import useWebSocket from "../../hooks/useWebSocket";
import { WebSocketContext } from "../../context/WebSocketContext";

/** Renders list of recipes that can be selected for view
 *
 *
 * MainContainer -> RecipesList -> [SharePopOut, RecipeListItem]
 */
function RecipesList({ recipes, handleSelect, selectedId }: RecipesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { resetMessage, status } = useContext(WebSocketContext);

  /** Close Share recipe Dialog panel */
  function closeDialogPanel() {
    setIsDialogOpen(false);
    // state setter is delayed until Dialog fades out
    setTimeout(() => {
      resetMessage();
    }, 310);
  }

  /** Open share recipes Dialog panel */
  function openDialogPanel() {
    setIsDialogOpen(true);
  }

  // Triggers recipient UI to communicate successful share of recipe/book.
  // No need to communicate to recipient failure. Only to sender. 
  useEffect(() => {
    if(status === 200) setIsDialogOpen(true);
  }, [status]);

  return (
    <section>
      <div>
        <SharePopOut
          action={"shareRecipe"}
          isDialogOpen={isDialogOpen}
          handleClose={closeDialogPanel}
          openDialogPanel={openDialogPanel}
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
