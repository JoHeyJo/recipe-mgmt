import { useState, useContext, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import IngredientsGroup from '../selectors/IngredientsGroup';
import { Ingredient, Instruction, Instructions, Recipe, Ingredients } from '../../utils/types';
import InputWithLabel from '../ui/InputWithLabel'
import API from '../../api';
import { errorHandling } from '../../utils/ErrorHandling';
import { useMediaQuery } from 'react-responsive';
import InstructionsArea from '../ui/InstructionsArea';
import { UserContext } from '../../context/UserContext';
import { RecipeRequestsProps } from '../../utils/props';
import NotesInput from '../ui/NotesInput';
import { recipeTemplate as template } from "../../utils/templates";
import { RecipeContext, RecipeContextType } from '../../context/RecipeContext';

/** Processes all recipe data
 * 
 * MainContainer -> RecipeRequests -> [IngredientsGroup, InstructionsArea, NotesInput, InputWithLabel]
 */

function RecipeRequests({ setShowing, isOpen, handleRecipesUpdate, handleRecipeDelete }: RecipeRequestsProps) {
  const [originalRecipe, setOriginalRecipe] = useState<any>();
  const [recipe, setRecipe] = useState<Recipe>(template);
  const [error, setError] = useState()

  const { currentBookId, userId } = useContext(UserContext);
  const {
    recipeId,
    recipeName,
    requestAction,
    contextIngredients,
    contextInstructions,
    selectedNotes
  } = useContext(RecipeContext);

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' }); // lg breakpoint in Tailwind

  /** Updates recipe state */
  function handleRecipeUpdate(data: string | Ingredient[] | Instruction | Instructions, section: string) {
    // if (section === "instruction") {
    //   setRecipe(prevRecipe => {
    //     console.log("prevRecipe", prevRecipe)
    //     const update = { ...prevRecipe };
    //     update.instructions.push(data as Instruction)
    //     return update
    //   })
    // } else {
      setRecipe(prevRecipe => (
        { ...prevRecipe, [section]: data }
      ));
    // }
  }

  /** Calls API - sends post request with recipe data */
  // ADD A CHECK TO FILTER OUT EMPTY FIELDS E.G. ingredient without values
  async function addRecipe() {
    try {
      const res = await API.postUserRecipe(recipe, currentBookId, userId);
      handleRecipesUpdate(res)
    } catch (error: any) {
      errorHandling("RecipeRequests - addRecipe", error)
    }
  }

  /** Calls API - sends patch request with only edited recipe data */
  async function editRecipe(originalRecipe: RecipeContextType, recipe: Recipe) {
    try {
      const mutatedData = filterRecipe(originalRecipe, recipe);
    } catch (error: any) {
      errorHandling("RecipeRequests - editRecipe", error)
    }
  }

  /** Filters out recipe data that hasn't changed */
  function filterRecipe(originalRecipe: RecipeContextType, recipe: Recipe) {
    const filteredData = {
      "name": originalRecipe.recipeName === recipe.name ? null : recipe.name,
      "ingredients": filterIngredients(originalRecipe.contextIngredients, recipe.ingredients),
      "instructions": filterInstructions(originalRecipe.contextInstructions, recipe.instructions)
    }
    return filteredData;
  }

  /** Compares edited to original instructions and filters out non-edited fields */
  function filterInstructions(original, edited){
    return edited.filter((instruction,index) => {
      return instruction.instruction !== original[index].instruction
    })
  }

  /** Compares edited to original ingredients and filters out non-edited fields */
  function filterIngredients(original, edited) {
    const alteredIngredients = original.reduce((alteredIngredients, ingredient, index) => {
      const amount = ingredient.amount === edited[index].amount ? null : edited[index].amount;
      const item = ingredient.item === edited[index].item ? null : edited[index].item;
      const unit = ingredient.unit === edited[index].unit ? null : edited[index].unit;
      const alteredIngredient = {
        "id": ingredient.ingredient_id,
        "amount": amount,
        "item": item,
        "unit": unit
      };
      if(amount || item || unit) alteredIngredients.push(alteredIngredient);
      return alteredIngredients;
    }, [])
    return alteredIngredients.length === 0 ? null : alteredIngredients;
  }

  /** Calls API - sends delete request for recipe */
  async function deleteRecipe(userId: number, bookId: number, recipeId: number) {
    try {
      const res = API.deleteUserRecipe(userId, currentBookId, recipeId)
      handleRecipeDelete()
    } catch (error: any) {
      setError(error.msg)
      errorHandling("RecipeRequests - addRecipe", error)
    }
  }

  function handleDelete() {
    setShowing(false)
    deleteRecipe(userId, currentBookId, recipeId)
  }

  function handleSubmit() {
    setShowing(false)
    addRecipe()
  }

  /** Renders request buttons */
  function renderRequestButtons() {
    return requestAction !== "edit"
      ?
      <button
        type="button"
        onClick={handleSubmit}
        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Submit
      </button>
      :
      <div className='flex'>
        <button
          type="button"
          onClick={() => editRecipe(originalRecipe, recipe)}
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 mx-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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

  // On mount, populate recipe name if recipe is selected
  // #### This needs to be fix.. not sure if this is the correct way to reset form to empty fields
  useEffect(() => {
    if (requestAction === "edit") {
      setRecipe(recipe => {
        const updatedRecipe = { ...recipe };
        updatedRecipe.name = recipeName;
        updatedRecipe.id = recipeId;
        return updatedRecipe;
      })
      setOriginalRecipe({
        recipeName,
        contextIngredients,
        contextInstructions,
        selectedNotes
      })
    } else {
      setRecipe(template)
    }
  }, [requestAction])

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
                <section id='RecipeRequests-book' className='flex h-full'>

                  <section id='RecipeRequests-ingredients' className="flex-1 mr-4">
                    <InputWithLabel {...{ id: "title", name: "title", type: "title" }} handleUpdate={handleRecipeUpdate} value={recipe.name} placeholder={"Awesome recipe name!"} />

                    <IngredientsGroup values={recipe.ingredients} handleUpdate={handleRecipeUpdate} />
                  </section>

                  <section id='RecipeRequests-instructions' className="flex-1 ml-4 ">
                    <InstructionsArea handleUpdate={handleRecipeUpdate} />
                  </section>
                </section>

                <section id='RecipeRequests-notes' className='flex-1'>
                  <NotesInput handleUpdate={handleRecipeUpdate} />
                </section>

              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              {renderRequestButtons()}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default RecipeRequests;