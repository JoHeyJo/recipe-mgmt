import "../../styles/Recipes.css";



type RecipeProps = {
  id: number;
  name: string;
}

//  border-red-500
/** Renders recipes 
 * 
 * 
 * MainContainer -> Recipes
 */
function Recipe({ id, name }: RecipeProps) {
  return (
    <li key={id} className="m-5 text-gray-700 hover:bg-gray-50 hover:text-gray-600">
      {name}
    </li>
  )
}

export default Recipe
