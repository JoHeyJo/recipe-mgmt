import FaShareButton from "./common/FaShareButton";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { LucideMoveButton } from "./common/LucideMoveButton";

type RecipeListItemProps = {
  name: string;
  index: number;
  recipeId: number;
  id: number;
  handleSelect: (index) => void;
  onOpenSharePanel: () => void;
  onOpenMovePanel: () => void;
};
/** Renders individual recipe item
 *
 * RecipesList -> RecipeListItem
 */
function RecipeListItem({
  name,
  index,
  recipeId,
  id,
  handleSelect,
  onOpenSharePanel,
  onOpenMovePanel
}: RecipeListItemProps) {
  const { PRIVILEGES } = useContext(UserContext);
  return (
    <li
      key={id}
      onClick={() => handleSelect(index)}
      className={`flex justify-between p-2 border-b hover:bg-selected ${recipeId === id ? "text-text-hover bg-selected" : "hover:text-text-hover"}`}
    >
      {name}
      <div className={`flex ${recipeId === id ? "block" : "hidden"}`}>
        {PRIVILEGES.full && (
          <LucideMoveButton handleClick={() => onOpenMovePanel()} />
        )}
        {PRIVILEGES.full && (
          <FaShareButton handleClick={() => onOpenSharePanel()} />
        )}
      </div>
    </li>
  );
}

export default RecipeListItem;
