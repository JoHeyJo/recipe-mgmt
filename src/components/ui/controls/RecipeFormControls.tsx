import { Recipe } from "../../../utils/types";

type RecipeFormControlsProps = {
  handleSubmit: () => {};
  isShared: boolean;
  isDisabled: boolean;
  selectedRecipe: () => {};
  recipe: Recipe;
  handleRemove: () => {};
  handleDelete: () => {};
  editRecipe: () => {};
};
function RecipeFormControls({
  handleSubmit,
  isShared,
  isDisabled,
  selectedRecipe,
  recipe,
  handleRemove,
  handleDelete,
  editRecipe,
}: RecipeFormControlsProps) {
  const formControls = {
    create: (
      <div className="flex">
        <button
          type="submit"
          onClick={handleSubmit}
          className="inline-flex w-full justify-center rounded-md bg-button-submit px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-default"
        >
          Submit
        </button>
      </div>
    ),
    editDelete: (
      <>
        <button
          type="button"
          // onClick={() => editRecipe(selectedRecipe, recipe)}
          disabled={isDisabled}
          className={`${isDisabled ? "bg-button-disabled hover:opacity-100" : "bg-button-submit"} inline-flex w-full justify-center rounded-md px-3 mx-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-default`}
        >
          Update
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 mx-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-default"
        >
          Delete
        </button>
      </>
    ),
    copyRemove: (
      <>
        <button
          type="button"
          onClick={() => {}}
          disabled={isDisabled}
          className={`bg-button-submit inline-flex w-full justify-center rounded-md px-3 mx-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-default`}
        >
          Copy
        </button>
        <button
          type="button"
          onClick={handleRemove}
          className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 mx-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-default"
        >
          Remove
        </button>
      </>
    ),
  };
  return (
    <div className="SubmitButton mt-5 sm:mt-6">
      <div className="flex">

      </div>
    </div>
  );
}

export default RecipeFormControls;
