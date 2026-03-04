import "../../styles/Recipes.css";
import { RecipesListProps } from "../../utils/props";
import RecipeListItem from "../ui/RecipeListItem";

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
          <RecipeListItem name={name} index={index} selectedId={selectedId} id={id} handleSelect={handleSelect} />
        ))}
      </ul>
    </section>
  );
}

export default RecipesList;
