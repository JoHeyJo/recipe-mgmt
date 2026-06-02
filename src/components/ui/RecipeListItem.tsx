// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FaShareButton from "./common/FaShareButton";
// import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

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
  const { PRIVILEGES } = useContext(UserContext);
  return (
    <li
      key={id}
      onClick={() => handleSelect(index)}
      className={`flex justify-between p-2 border-b hover:bg-selected ${recipeId === id ? "text-text-hover bg-selected" : "hover:text-text-hover"}`}
    >
      {name}
      <div className={`${recipeId === id ? "block" : "hidden"}`}>
        {PRIVILEGES.full && <FaShareButton handleClick={() => handleOpen()} />}
      </div>
    </li>
  );
}

export default RecipeListItem;
