import { Recipe } from "../../utils/types";
import IngredientsView from "./IngredientsView";
import InstructionsView from "./InstructionsView";
import NotesView from "./NotesView";

type RecipeViewProps = {
  recipe: Recipe;
}

/** Renders view of entire recipe.
 * 
 * 
 * RecipeContainer -> RecipeView ->
 */

function RecipeView({ recipe }: RecipeViewProps) {
  const { name, instructions, notes, ingredients } = recipe;
  return (
    <>
      <div className="flex py-4 justify-between">
        <h3 className="text-base px-4 font-semibold leading-7 text-gray-900">Title:</h3>
        <p className="max-w-2xl mx-auto leading-6 text-gray-900">{name}</p>
      </div>
      <div className="border-t border-gray-100">
        <section className="divide-y divide-gray-100">
          <IngredientsView ingredients={ingredients} />
          <InstructionsView instructions={instructions}/>
          <NotesView notes={notes}/>
        </section>
      </div>
    </>
  )
}

export default RecipeView;