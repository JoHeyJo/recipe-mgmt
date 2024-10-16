import "../../styles/Recipes.css";



type RecipesProps = {
  id: number;
  name: string;
}

//  border-red-500
/** Renders recipes 
 * 
 * 
 * MainContainer -> Recipes
 */
function Recipes({id, name}) {
  return (
    <li key={id} className="border-1 pt-6 py-4">
      {name}
    </li>
  )
}

export default Recipes
