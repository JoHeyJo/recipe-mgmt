import FaShareButton from "./common/FaShareButton";

type RecipeListItemProps = {
  name: string;
  index: number;
  selectedId: number;
  id: number;
  handleSelect: (index) => void;
};
/** Renders individual recipe item
 * 
 * RecipesList -> RecipeListItem
 */
function RecipeListItem({
  name,
  index,
  selectedId,
  id,
  handleSelect,
}: RecipeListItemProps) {
  return (
    <li
      key={id}
      onClick={() => handleSelect(index)}
      className={`flex justify-between p-2 border-b hover:bg-selected ${selectedId === id ? "text-text-hover bg-selected" : "hover:text-text-hover"}`}
    >
      {name}
      <FaShareButton handleClick={()=>{}}/>
    </li>
  );
}

export default RecipeListItem;
