import "../../styles/Recipes.css";
import { Recipe } from "../../utils/types";
import { RecipesListProps } from "../../utils/props";

/** Renders recipe
 * 
 * 
 * MainContainer -> Recipes
 */
function RecipesList({ recipes, handleSelect }: RecipesListProps) {
  return (
    <section id="RecipesList-container" className="flex-1">
      <div>Recipes</div>
      <ul role="list" id="Recipes-container" className="border-2 border-blue-900 divide-y divide-gray-200">
        {recipes.map(({ name, id }, index) => (
          <li key={id} onClick={() => handleSelect(index)} className="p-2 hover:bg-gray-50 hover:text-gray-600">
            {name}
          </li>
        ))}
      </ul>

    </section>
  )
}

export default RecipesList
