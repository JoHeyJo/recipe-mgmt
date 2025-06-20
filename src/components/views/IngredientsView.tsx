import { IngredientsViewProp } from "../../utils/props";

/** Renders list of ingredients
 *
 *
 * RecipeView -> IngredientsView
 */
function IngredientsView({ ingredients }: IngredientsViewProp) {
  return (
    <div
      id="IngredientsView-container"
      className="flex px-4 py-6 sm:gap-4 sm:px-3 border-b-2 border-t-2 border-[#1f2937]"
    >
      <div className="basis-1/3 self-center text-sm font-medium leading-6 ">
        Ingredients:
      </div>
      <div className="basis-2/3 space-y-4 ml-4">
        {ingredients.map((ingredient, i) => (
          <dl key={i} id="IngredientsView-ingredient" className="md:pr-9 flex">
            <dd className="flex-1 text-sm leading-6 sm:col-span-2">
              {ingredient.amount ? ingredient.amount.value : ""}
            </dd>
            <dd className="flex-1 text-sm leading-6 sm:col-span-2">
              {ingredient.unit ? ingredient.unit.type : ""}
            </dd>
            <dt className="flex-1 text-sm leading-6 sm:col-span-2">
              {ingredient.item ? ingredient.item.name : ""}
            </dt>
          </dl>
        ))}
      </div>
    </div>
  );
}

export default IngredientsView;
