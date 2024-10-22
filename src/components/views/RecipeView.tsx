import { Recipe } from "../../utils/types";
import IngredientsView from "./IngredientsView";

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
        <dl className="divide-y divide-gray-100">

              <IngredientsView ingredients={ingredients} />

          <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">Instructions</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-s .pan-2 sm:mt-0">margotfoster@example.com</dd>
          </div>
          <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">Notes:</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
          </div>
        </dl>
      </div>
    </>
  )
}

export default RecipeView;