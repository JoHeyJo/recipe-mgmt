import "../../styles/Recipes.css";
import { Recipe } from "../../utils/types";
import { RecipesListProps } from "../../utils/props";

/** Renders list of recipes that can be selected for view
 *
 *
 * MainContainer -> Recipes
 */
function RecipesList({ recipes, handleSelect }: RecipesListProps) {
  return (
    <>
      <ul
        role="list"
        id="Recipes-container"
        className=" divide-y divide-light-border"
      >
        {recipes.map(({ name, id }, index) => (
          <li
            key={id}
            onClick={() => handleSelect(index)}
            className="p-2 hover:bg-gray-50 hover:text-gray-600 border-b border-primary"
          >
            {name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default RecipesList;
