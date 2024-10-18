import "../../styles/Recipes.css";
import { Recipe } from "../../utils/types";

type IndexProps = {
  id: number;
  name: string;
  index: number;
  handleSelect: (index: number) => void;
}

/** Renders recipe
 * 
 * 
 * MainContainer -> Recipes
 */
function Index({ id, name, index, handleSelect }: IndexProps) {
  return (
    <li key={id} onClick={()=>handleSelect(index)} className="m-5 text-gray-700 hover:bg-gray-50 hover:text-gray-600">
      {name}
    </li>
  )
}

export default Index
