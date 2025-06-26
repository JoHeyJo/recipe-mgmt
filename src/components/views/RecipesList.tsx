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
      >
        {recipes.map(({ name, id }, index) => (
          <li
            key={id}
            onClick={() => handleSelect(index)}
            className="p-2 hover:bg-data-hover hover:text-text-hover border-b border-secondary"
          >
            {name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default RecipesList;
