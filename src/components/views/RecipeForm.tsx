import { useRef, useState, useEffect } from "react";
import Alert from "../ui/Alert";
import { ReferenceContext } from "../../context/ReferenceContext";
import TitleInput from "../ui/TitleInput";
import IngredientsGroup from "../selectors/IngredientsGroup";
import InstructionsRequests from "../requests/InstructionsRequests";
import NotesInput from "../ui/NotesInput";
import RecipeFormControls from "../ui/controls/RecipeFormControls";
import { compareIngredients, compareInstructions, compareNames, compareNotes } from "../../utils/filters";


const action = {
  copyRemove: true,
  edit: true
}

function RecipeForm(
  error,
  isActionCopyRemove,
  handleRecipeUpdate,
  handleRecipeSubmit,
  recipe,
  selectedRecipe,
  openBookDropdown,
) {
  const [isDisabled, setIsDisabled] = useState(true);

  const dialogPanelRef = useRef(null);

  /** Enables/disables UPDATE submit */
  useEffect(() => {
    if (requestAction === "edit") {
      const name = compareNames(selectedRecipe.name, recipe.name);
      const ingredients = compareIngredients(
        selectedRecipe.ingredients,
        recipe.ingredients,
      );
      const instructions = compareInstructions(
        selectedRecipe.instructions,
        recipe.instructions,
      );
      const notes = compareNotes(selectedRecipe.notes, recipe.notes);
      const isAltered = name || ingredients || instructions || notes;
      setIsDisabled(!isAltered);
    }
  }, [recipe]);

  return (
    <>
      {error && <Alert alert={error} degree={"yellow"} />}{" "}
      {/* This will be a popup instead */}
      {/* <form onSubmit={handleSubmit}> */}
      <div className={isActionCopyRemove !== "copyRemove" ? "h-80" : ""}>
        {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
              </div> */}
        {/* <div className="mt-3 h-full border-2 border-yellow-300 text-center sm:mt-5"> */}
        {/* <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                  Payment successful
                </DialogTitle> */}
        {/* <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                  </p>
                </div> */}
        {isActionCopyRemove === "copyRemove" && (
          <p>
            NOTE: Once a recipe is copied to a recipe book, you will be the
            owner of that copy.{" "}
          </p>
        )}

        {isActionCopyRemove !== "copyRemove" && (
          <section
            id="RecipeRequests-book"
            className="mx-auto h-full flex-col "
          >
            <section id="RecipeRequests-recipe" className="flex h-2/3">
              <ReferenceContext.Provider
                value={{ dialogPanelRef: dialogPanelRef }}
              >
                <section
                  id="RecipeRequests-title-ingredients"
                  className="flex-1 h-full flex flex-col"
                >
                  <div className="">
                    <TitleInput handleUpdate={handleRecipeUpdate} />
                  </div>

                  <div
                    id="RecipeRequests-ingredients"
                    className="flex-1 overflow-hidden"
                  >
                    <IngredientsGroup handleRecipeUpdate={handleRecipeUpdate} />
                  </div>
                </section>

                <section
                  id="RecipeRequests-instructions"
                  className="flex-col flex flex-1 ml-4 rounded-md"
                >
                  <InstructionsRequests
                    handleRecipeUpdate={handleRecipeUpdate}
                  />
                </section>
              </ReferenceContext.Provider>
            </section>

            <section id="RecipeRequests-notes" className="">
              <NotesInput handleUpdate={handleRecipeUpdate} />
            </section>
          </section> 
        )}
        {/* </div> */}
      </div>
      <div className="SubmitButton mt-5 sm:mt-6">
        <RecipeFormControls
          handleSubmit={handleRecipeSubmit}
          isDisabled={isDisabled}
          recipe={recipe}
          handleRemove={handleRemove}
          handleDelete={handleDelete}
          editRecipe={editRecipe}
          openDropdown={openBookDropdown}
        />
      </div>
    </>
  );
}

export default RecipeForm;
