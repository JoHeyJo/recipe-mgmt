import "../../styles/Recipes.css";

type IndexProps = {
  id: number;
  name: string;
}

/** Renders recipe
 * 
 * 
 * MainContainer -> Recipes
 */
function Index({ id, name }: IndexProps) {
  return (
    <li key={id} className="m-5 text-gray-700 hover:bg-gray-50 hover:text-gray-600">
      {name}
    </li>
  )
}

export default Index
