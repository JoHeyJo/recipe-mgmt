import { useState, useContext, useEffect, FormEventHandler, FormEvent } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import IngredientsGroup from '../selectors/IngredientsGroup';
import { Ingredient, Instruction, Instructions, Recipe } from '../../utils/types';
import API from '../../api';
import { errorHandling } from '../../utils/ErrorHandling';
import { useMediaQuery } from 'react-responsive';
import InstructionsRequests from './InstructionsRequests';
import { UserContext } from '../../context/UserContext';
import { RecipeRequestsProps } from '../../utils/props';
import NotesInput from '../ui/NotesInput';
import { RecipeContext, RecipeContextType } from '../../context/RecipeContext';
import { compareIngredients, compareInstructions, compareNames, filterRecipe, compareNotes, filterTemplate } from '../../utils/filters';
import TitleInput from '../ui/TitleInput';
import { recipeTemplate } from '../../utils/templates';
import Alert from '../ui/Alert';

/** Processes recipe data. Context data is passed through here on edit. Else template data.
 * RecipeRequests data is mutable while context data(reference data) is not
 * 
 * MainContainer -> RecipeRequests -> [IngredientsGroup, InstructionsArea, NotesInput, TitleInput]
 */
function RecipeRequests({ recipeActions, setShowing, isOpen }: RecipeRequestsProps) {
  const { currentBookId, userId } = useContext(UserContext);
  const {
    recipeId,
    recipeName,
    requestAction,
    contextIngredients,
    contextInstructions,
    selectedNotes
  } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState<any>({
    name: recipeName,
    id: recipeId,
    ingredients: contextIngredients,
    instructions: contextInstructions,
    notes: selectedNotes,
  });
  const [error, setError] = useState()
  const [isDisabled, setIsDisabled] = useState(true);

  const selectedRecipe = {
    recipeId,
    recipeName,
    requestAction,
    contextIngredients,
    contextInstructions,
    selectedNotes
  }

  // syncs selected original recipe with mutable recipe
  useEffect(() => {
    setRecipe({
      name: recipeName,
      id: recipeId,
      ingredients: contextIngredients,
      instructions: contextInstructions,
      notes: selectedNotes,
    })
  }, [recipeId])

  /** Enables/disables UPDATE submit */
  useEffect(() => {
    if (requestAction === "edit") {
      const name = compareNames(recipeName, recipe.name);
      const ingredients = compareIngredients(contextIngredients, recipe.ingredients);
      const instructions = compareInstructions(contextInstructions, recipe.instructions);
      const notes = compareNotes(selectedNotes, recipe.notes);
      const isAltered = name || ingredients || instructions || notes;
      setIsDisabled(!isAltered)
    }
  }, [recipe])

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' }); // lg breakpoint in Tailwind

  /** Updates recipe state */
  function handleRecipeUpdate(data: string | Ingredient[] | Instruction | Instructions, section: string) {
    setRecipe(prevRecipe => (
      { ...prevRecipe, [section]: data }
    ));
  }

  /** Calls API - sends post request with recipe data */
  // ADD A CHECK TO FILTER OUT EMPTY FIELDS E.G. ingredient/instructions without values
  async function addRecipe() {
    try {
      const filteredRecipe = filterTemplate(recipe, recipeTemplate);
      console.log(filteredRecipe)
      const res = await API.postUserRecipe(filteredRecipe, currentBookId, userId);
      recipeActions.updateRecipes(res)  
      return "submitted"
    } catch (error: any) {
      errorHandling("RecipeRequests - addRecipe", error)
      setError(error.error)
      setTimeout(() => setError(null), 5000)
    }
  }

  /** Calls API - sends patch request with only edited recipe data */
  async function editRecipe(originalRecipe: RecipeContextType, mutableRecipe: Recipe) {
    try {
      const mutatedData = filterRecipe(originalRecipe, mutableRecipe);
      const res = await API.editBookRecipe(userId, currentBookId, recipeId, mutatedData);
      recipeActions.editRecipe()
      return res;
    } catch (error: any) {
      errorHandling("RecipeRequests - editRecipe", error);
    }
  }
  /** Calls API - sends delete request for recipe */
  async function deleteRecipe(userId: number, bookId: number, recipeId: number) {
    try {
      const res = API.deleteUserRecipe(userId, currentBookId, recipeId)
      recipeActions.deleteRecipe()
    } catch (error: any) {
      setError(error.message)
      setTimeout(() => setError(null), 5000)
      errorHandling("RecipeRequests - addRecipe", error)
    }
  }

  function handleDelete() {
    setShowing()
    deleteRecipe(userId, currentBookId, recipeId)
  }

  async function handleSubmit() {
    // e.preventDefault()
    const res = await addRecipe()
    if (res) setShowing()
  }

  return (
    <Dialog open={isOpen} onClose={setShowing} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            id='RecipeRequests-DialogPanel'
            transition
            className="relative h-full transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
            {error && <Alert alert={error} degree={"yellow"} />} {/* This will be a popup instead */}
            {/* <form onSubmit={handleSubmit}> */}
            <div>
              {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
              </div> */}
              <div className="mt-3 text-center sm:mt-5">
                {/* <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                  Payment successful
                </DialogTitle> */}
                {/* <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                  </p>
                </div> */}

                <section id='RecipeRequests-book' className='flex flex-col'>

                  <section id='RecipeRequests-recipe' className='flex'>
                    <section id='RecipeRequests-ingredients' className="flex-1 mr-4">
                      <TitleInput handleUpdate={handleRecipeUpdate} />

                      <IngredientsGroup handleRecipeUpdate={handleRecipeUpdate} />
                    </section>

                    <section id='RecipeRequests-instructions' className="flex-1 ml-4 ">
                      <InstructionsRequests handleRecipeUpdate={handleRecipeUpdate} />
                    </section>
                  </section>

                  <section id='RecipeRequests-notes' className='pt-6'>
                    <NotesInput handleUpdate={handleRecipeUpdate} />
                  </section>
                </section>

              </div>
            </div>

            <div className="mt-5 sm:mt-6">
              {
                requestAction !== "edit"
                  ?
                  <div className='flex'>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Submit
                    </button>
                  </div>
                  :
                  <div className='flex'>
                    <button
                      type="button"
                      onClick={() => editRecipe(selectedRecipe, recipe)}
                      disabled={isDisabled}
                      className={`${isDisabled ? "bg-gray-600" : "bg-indigo-600 hover:bg-indigo-500"} inline-flex w-full justify-center rounded-md px-3 mx-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 mx-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      delete
                    </button>
                  </div>
              }
            </div>
            {/* </form> */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default RecipeRequests;