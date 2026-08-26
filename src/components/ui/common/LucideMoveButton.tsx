import { FolderInput } from "lucide-react";
/** Icon component that calls action to share a book with another user
 *
 * [RecipeListItem] -> LucideMoveButton
 */
export function LucideMoveButton({ handleClick }) {
  return (
    <button onClick={() => handleClick()} type="button" className="px-2 ">
      <FolderInput />
    </button>
  );
}

