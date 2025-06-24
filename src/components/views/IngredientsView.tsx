import { styleRecipeRows } from "../../utils/functions";
import { IngredientsViewProp } from "../../utils/props";
import { Ingredients } from "../../utils/types";

/** Renders list of ingredients
 *
 *
 * RecipeView -> IngredientsView
 */
function IngredientsView({ ingredients }: IngredientsViewProp) {
  /**Guards against rendering empty data */
  function shouldIngredientsRender(ingredients: Ingredients) {
    return ingredients.length > 1;
  }

  const isIngredientsEmpty =
    ingredients.length === 0 || ingredients[0].id === 0;

  return (
    <div
      id="IngredientsView-container"
      className={`flex sm:gap-4 ${isIngredientsEmpty ? "py-6" : ""} border-b-2 border-t-2 border-primary`}
    >
      <div className="basis-1/6 self-center text-sm font-medium leading-6 ">
        Ingredients:
      </div>
      <div className="basis-5/6">
        {shouldIngredientsRender(ingredients) &&
          ingredients.map(({ amount, unit, item, ingredient_id }, i) => (
            <dl
              key={ingredient_id}
              id="IngredientsView-ingredient"
              className={`md:pr-9 py-2 pl-2 text-md flex ${i % 2 === 0 ? "bg-accent" : "bg-secondary-accent"}`}
            >
              <dd className="flex-1 leading-6 sm:col-span-2">
                {amount ? amount.value : ""}
              </dd>
              <dd className="flex-1 leading-6 sm:col-span-2">
                {unit ? unit.type : ""}
              </dd>
              <dt className="flex-1 leading-6 sm:col-span-2">
                {item ? item.name : ""}
              </dt>
            </dl>
          ))}
      </div>
    </div>
  );
}

export default IngredientsView;
