import FaShareButton from "./common/FaShareButton";
import API from "../../api";

type RecipeListItemProps = {
  name: string;
  index: number;
  recipeId: number;
  id: number;
  handleSelect: (index) => void;
  handleOpen: () => void;
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
  handleOpen,
}: RecipeListItemProps) {
  return (
    <li
      key={id}
      onClick={() => handleSelect(index)}
      className={`flex justify-between p-2 border-b hover:bg-selected ${recipeId === id ? "text-text-hover bg-selected" : "hover:text-text-hover"}`}
    >
      {name}
      <div className={`${recipeId === id ? "block" : "hidden"}`}>
        <FaShareButton handleClick={() => handleOpen()} />
      </div>
    </li>
  );
}

export default RecipeListItem;
