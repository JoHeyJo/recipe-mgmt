import { Recipe } from "../../utils/types";

type RecipeViewProps = {
  recipe: Recipe;
}

function RecipeView({ recipe }: RecipeViewProps) {
  const { name, instructions, notes, ingredients } = recipe;
  console.log(ingredients)
  return (
    <div className=''>
      <div className="">
        <h3 className="text-base px-4 font-semibold leading-7 text-gray-900">Title:</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{name}</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="flex bg-white px-4 py-6 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">Ingredients</dt>
            <div className="flex flex-col space-y-4 ml-4">
              {ingredients.map((ingredient, i) => (
                <div key={i} id="RecipeView-ingredient" className="space-x-4 justify-space-between">
                  <span className="text-sm leading-6 text-gray-700 sm:col-span-2">{ingredient.amount.value}</span>
                  <span className="text-sm leading-6 text-gray-700 sm:col-span-2">{ingredient.unit.type}</span>
                  <span className="text-sm leading-6 text-gray-700 sm:col-span-2">{ingredient.item.name}</span>
                </div>
              ))}
            </div>
          </div>
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
    </div>
  )
}

export default RecipeView;