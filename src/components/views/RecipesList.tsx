import { useContext, useState, useEffect } from "react";
import "../../styles/Recipes.css";
import { RecipesListProps } from "../../utils/props";
import RecipeListItem from "../ui/RecipeListItem";
import { WebSocketContext } from "../../context/WebSocketContext";
import Share from "../requests/Share";
import RecipeMove from "../requests/RecipeMove";

/** Renders list of recipes that can be selected for view
 *
 *
 * MainContainer -> RecipesList -> [Share, RecipeMove, RecipeListItem]
 */
function RecipesList({ recipes, handleSelect, selectedId }: RecipesListProps) {
  const [isRecipeShareOpen, setIsRecipeShareOpen] = useState(false);
  const [isRecipeMoveOpen, setIsRecipeMoveOpen] = useState(false);

  const { status } = useContext(WebSocketContext);

  /** Close Share recipe Dialog panel */
  function handleCloseRecipeShare() {
    setIsRecipeShareOpen(false);
  }

  /** Close move recipe Dialog panel */
  function handleCloseRecipeMove(){
    setIsRecipeMoveOpen(false);
  }

  /** Open share recipes Dialog panel */
  function handleOpenSharePanel() {
    setIsRecipeShareOpen(true);
  }

  /** Open move recipes dialog panel */
  function handleOpenMovePanel(){
    setIsRecipeMoveOpen(true);
  }

  // Triggers recipient UI to communicate successful share of recipe/book.
  // No need to communicate to recipient failure. Only to sender.
  useEffect(() => {
    if (status === 200) setIsRecipeShareOpen(true);
  }, [status]);

  return (
    <section>
      <div>
        <Share
          isDialogOpen={isRecipeShareOpen}
          onCloseDialogPanel={handleCloseRecipeShare}
        />
      </div>
      <RecipeMove
        isDialogOpen={isRecipeMoveOpen}
        onCloseDialogPanel={handleCloseRecipeMove}
      />
      <ul
        // className="h-full overflow-y-scroll"
        role="list"
        id="Recipes-container"
      >
        {recipes.map(({ name, id }, index) => (
          <RecipeListItem
            key={id}
            name={name}
            index={index}
            recipeId={selectedId}
            id={id}
            handleSelect={handleSelect}
            onOpenSharePanel={handleOpenSharePanel}
            onOpenMovePanel={handleOpenMovePanel}
          />
        ))}
      </ul>
    </section>
  );
}

export default RecipesList;
