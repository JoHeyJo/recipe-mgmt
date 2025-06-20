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
      className={`flex sm:gap-4  ${ingredients[0].id === 0 && "py-6"} border-b-2 border-t-2 border-primary`}
    >
      <div className="basis-1/6 self-center text-sm font-medium leading-6 ">
        Ingredients:
      </div>
      <div className="basis-5/6">
        {ingredients[0].id !== 0 && ingredients.map((ingredient, i) => (
          <dl
            key={i}
            id="IngredientsView-ingredient"
            className={`md:pr-9 py-2 pl-2 text-md flex ${i % 2 === 0 ? "bg-secondary" : "bg-secondary-accent"}`}
          >
            <dd className="flex-1 leading-6 sm:col-span-2">
              {ingredient.amount ? ingredient.amount.value : ""}
            </dd>
            <dd className="flex-1 leading-6 sm:col-span-2">
              {ingredient.unit ? ingredient.unit.type : ""}
            </dd>
            <dt className="flex-1 leading-6 sm:col-span-2">
              {ingredient.item ? ingredient.item.name : ""}
            </dt>
          </dl>
        ))}
      </div>
    </div>
  );
}

export default IngredientsView;
