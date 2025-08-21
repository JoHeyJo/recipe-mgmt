import "../../styles/Recipes.css";
import { Recipe } from "../../utils/types";
import { RecipesListProps } from "../../utils/props";

/** Renders list of recipes that can be selected for view
 *
 *
 * MainContainer -> Recipes
 */
function RecipesList({ recipes, handleSelect, selectedId }: RecipesListProps) {
  return (
    <section>
      <ul
        // className="h-full overflow-y-scroll"
        role="list"
        id="Recipes-container"
      >
        {recipes.map(({ name, id }, index) => (
          <li
            key={id}
            onClick={() => handleSelect(index)}
            className={`p-2 border-b hover:bg-selected ${selectedId === id ? "text-text-hover bg-selected" : "hover:text-text-hover"}`}
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecipesList;
