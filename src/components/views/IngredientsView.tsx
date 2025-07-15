import { IngredientsViewProp } from "../../utils/props";
import { Ingredients } from "../../utils/types";

/** Renders list of ingredients
 *
 *
 * RecipeView -> IngredientsView
 */
function IngredientsView({ ingredients }: IngredientsViewProp) {
  /**Guards against rendering empty data */
  function shouldIngredientsRender() {
    return ingredients[0].id !== 0;
  }

  const isIngredientsEmpty = ingredients[0].id === 0;

  return (
    <div
      id="IngredientsView-container"
      className={`flex sm:gap-4 ${isIngredientsEmpty ? "py-4" : ""} bg-data-hover border-b-2 border-t-2 sm:pl-3`}
    >
      <section className="basis-1/6 self-center font-medium leading-6">
        Ingredients:
      </section>
      <ol className="basis-5/6 divide-y divide-border-color">
        {shouldIngredientsRender() &&
          ingredients.map(({ amount, unit, item, ingredient_id }, i) => (
            <li
              key={ingredient_id}
              id="IngredientsView-ingredient"
              className={`md:pr-9 py-2 pl-2 text-md flex odd:bg-accent even:bg-accent-secondary`}
            >
              <div className="flex-1 leading-6 sm:col-span-2">
                {amount ? amount.value : ""}
              </div>
              <div className="flex-1 leading-6 sm:col-span-2">
                {unit ? unit.type : ""}
              </div>
              <div className="flex-1 leading-6 sm:col-span-2">
                {item ? item.name : ""}
              </div>
            </li>
          ))}
      </ol>
    </div>
  );
}

export default IngredientsView;
