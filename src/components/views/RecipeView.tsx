import { Recipe } from "../../utils/types";
import IngredientsView from "./IngredientsView";
import InstructionsView from "./InstructionsView";
import NotesView from "./NotesView";
import { recipeTemplate } from "../../utils/templates";

type RecipeViewProps = {
  recipe: Recipe;
};

/** Renders view of entire recipe.
 *
 *
 * RecipeContainer -> RecipeView -> [IngredientsView, InstructionsView, NotesView]
 */

function RecipeView({ recipe }: RecipeViewProps) {
  const { name, instructions, notes, ingredients } = recipe;

  return (
    <>
      <div className="">
        <section>
          <IngredientsView
            ingredients={
              ingredients.length === 0
                ? recipeTemplate.ingredients
                : ingredients
            }
          />
          <InstructionsView
            instructions={
              instructions.length === 0
                ? recipeTemplate.instructions
                : instructions
            }
            prevSectionLength={ingredients.length}
          />
          <NotesView notes={notes} prevSectionLength={instructions.length - ingredients.length} />
        </section>
      </div>
    </>
  );
}

export default RecipeView;
