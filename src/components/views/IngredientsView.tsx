import { IngredientsViewProp } from "../../utils/props";

/** Renders list of ingredients
 * 
 * 
 * RecipeView -> IngredientsView
 */
function IngredientsView({ ingredients }: IngredientsViewProp) {
  return (
      <div className="flex bg-white px-4 py-6 sm:gap-4 sm:px-3">
        <div style={{ flex: '1 1 33.33%' }} className="text-sm font-medium leading-6 text-gray-900">Ingredients</div>
        <div style={{ flex: '2 1 66.66%' }} className="space-y-4 ml-4">
          {ingredients.map((ingredient, i) => (
            <div key={i} id="IngredientsView-ingredient" className="flex space-x-4 ">
              <span className="flex-1 text-sm leading-6 text-gray-700 sm:col-span-2">{ingredient.amount.value}</span>
              <span className="flex-1 text-sm leading-6 text-gray-700 sm:col-span-2">{ingredient.unit.type}</span>
              <span className="flex-1 text-sm leading-6 text-gray-700 sm:col-span-2">{ingredient.item.name}</span>
            </div>
          ))}
        </div>
      </div>
  )
}

export default IngredientsView;