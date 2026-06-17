import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { RecipeContext } from "../../../context/RecipeContext";
import { RecipeFormControlsProps } from "../../../utils/props";


/** Dynamically renders controls for selected recipe form based on privileges
 * RecipeForm -> RecipeFormControls
 */
function RecipeFormControls({
  recipeAction,
  isDisabled,
  onOpenDropdown
}: RecipeFormControlsProps) {
  const { PRIVILEGES } = useContext(UserContext);
  const { requestAction } = useContext(RecipeContext);

  const formControls = {
    create: (
      <button
        type="submit"
        onClick={recipeAction.submit}
        className="inline-flex w-full justify-center rounded-md bg-button-submit px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-default"
      >
        Submit
      </button>
    ),
    editDelete: (
      <>
        <button
          type="button"
          onClick={recipeAction.edit}
          disabled={isDisabled}
          className={`${isDisabled ? "bg-button-disabled hover:opacity-100" : "bg-button-submit"} inline-flex w-full justify-center rounded-md px-3 mx-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-default`}
        >
          Update
        </button>
        <button
          type="button"
          onClick={recipeAction.delete}
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
          onClick={onOpenDropdown}
          // disabled={isDisabled}
          className={`bg-button-submit inline-flex w-full justify-center rounded-md px-3 mx-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-default`}
        >
          Copy
        </button>
        <button
          type="button"
          onClick={recipeAction.remove}
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
      (PRIVILEGES.full || PRIVILEGES.collaborator)
    )
      return formControls.create;
    if (PRIVILEGES.full || PRIVILEGES.collaborator)
      return formControls.editDelete;
    if (PRIVILEGES.full || PRIVILEGES.collaborator)
      return formControls.editDelete;
    if (PRIVILEGES.sharedInbox) return formControls.copyRemove;
  }

  return (
    <div className="SubmitButton mt-5 sm:mt-6">
      <div className="flex">{renderRecipeFormControls()}</div>
    </div>
  );
}

export default RecipeFormControls;
