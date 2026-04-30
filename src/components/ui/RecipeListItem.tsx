// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FaShareButton from "./common/FaShareButton";
// import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

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
      {/* <div id="RecipeListItem-left-align" className="px-2"> */}
        {name}
        {/* <FontAwesomeIcon icon={faShareNodes} />
      </div> */}
      <div className={`${recipeId === id ? "block" : "hidden"}`}>
        <FaShareButton handleClick={() => handleOpen()} />
      </div>
    </li>
  );
}

export default RecipeListItem;
