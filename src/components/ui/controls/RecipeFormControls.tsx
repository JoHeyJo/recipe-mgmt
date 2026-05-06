import { Recipe } from "../../../utils/types";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { RecipeContextType, RecipeContext } from "../../../context/RecipeContext";

type RecipeFormControlsProps = {
  handleSubmit: (e: any) => Promise<void>;
  isDisabled: boolean;
  recipe: Recipe;
  handleRemove: () => {};
  handleDelete: () => {};
  editRecipe: (originalRecipe: Recipe, mutableRecipe: Recipe) => {};
};
function RecipeFormControls({
  handleSubmit,
  isDisabled,
  recipe,
  handleRemove,
  handleDelete,
  editRecipe,
}: RecipeFormControlsProps) {
  const { privileges } = useContext(UserContext);
  const { selectedRecipe, requestAction } = useContext(RecipeContext);


  const formControls = {
    create: (
      <button
        type="submit"
        onClick={handleSubmit}
        className="inline-flex w-full justify-center rounded-md bg-button-submit px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-default"
      >
        Submit
      </button>
    ),
    editDelete: (
      <>
        <button
          type="button"
          onClick={() => editRecipe(selectedRecipe, recipe)}
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

  function renderRecipeFormControls() {
    if (
      requestAction === "create" &&
      (privileges.full || privileges.collaborator)
    )
      return formControls.create;
    if (privileges.full || privileges.collaborator)
      return formControls.editDelete;
    if (privileges.full || privileges.collaborator)
      return formControls.editDelete;
    if (privileges.sharedInbox) return formControls.copyRemove;
  }

  return (
    <div className="SubmitButton mt-5 sm:mt-6">
      <div className="flex">{renderRecipeFormControls()}</div>
    </div>
  );
}

export default RecipeFormControls;
