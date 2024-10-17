
function RecipeView() {
  return (
    <div className=''>
      <div className="">
        <h3 className="text-base px-4 font-semibold leading-7 text-gray-900">Title</h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">

          <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">Ingredients</dt>
            {/* <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd> */}
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