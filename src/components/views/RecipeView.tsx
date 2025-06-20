import { Recipe } from "../../utils/types";
import IngredientsView from "./IngredientsView";
import InstructionsView from "./InstructionsView";
import NotesView from "./NotesView";

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
      <div className="border-t border-gray-100">
        <section className="divide-y divide-gray-100">
          <IngredientsView
            ingredients={ingredients}
            index={instructions.length}
          />
          <InstructionsView
            instructions={instructions}
            prevSectionLength={ingredients.length}
          />
          <NotesView notes={notes} />
        </section>
      </div>
    </>
  );
}

export default RecipeView;
