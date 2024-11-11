import { useState, useContext, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import IngredientsGroup from '../selectors/IngredientsGroup';
import { Ingredient, Instructions, Recipe } from '../../utils/types';
import InputWithLabel from '../ui/InputWithLabel'
import API from '../../api';
import { errorHandling } from '../../utils/ErrorHandling';
import { useMediaQuery } from 'react-responsive';
import InstructionsArea from '../ui/InstructionsArea';
import { UserContext } from '../../context/UserContext';
import { AddRecipeProps } from '../../utils/props';
import NotesInput from '../ui/NotesInput';
import { recipeTemplate as template } from "../../utils/templates";
import { RecipeContext, RecipeContextType } from '../../context/RecipeContext';



/** Processes all recipe data
 * 
 * RecipeContainer -> AddRecipe -> [IngredientsGroup, InstructionsArea, NotesInput, InputWithLabel]
 */

function AddRecipe({setShowing, isOpen, handleRecipesUpdate }: AddRecipeProps) {
  const [recipe, setRecipe] = useState<Recipe>(template);

  const { currentBookId, userId } = useContext(UserContext);
  const { recipeId } = useContext(RecipeContext);

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' }); // lg breakpoint in Tailwind

  /** Updates recipe state */
  function handleRecipeUpdate(data: string | Ingredient[] | Instructions, section: string) {
    setRecipe(prevRecipe => (
      { ...prevRecipe, [section]: data }
    ));
  }

  /** Calls api to send recipe data */
  // ADD A CHECK TO FILTER OUT EMPTY FIELDS E.G. ingredient without values
  async function addRecipe() {
    try {
      const res = await API.postUserRecipe(recipe, currentBookId, userId);
      handleRecipesUpdate(res)
    } catch (error: any) {
      errorHandling("AddRecipe - addRecipe", error)
    }
  }

  function handleSubmit() {
    setShowing(false)
    addRecipe()
  }

  // useEffect(() => {
  //   setRecipe(recipeTemplate)
  // }, [recipeTemplate])

  return (
    <Dialog open={isOpen} onClose={setShowing} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            id='AddRecipe-DialogPanel'
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
                  <section id='AddRecipe-book' className='flex h-full'>

                    <section id='AddRecipe-ingredients' className="flex-1 mr-4">
                      <InputWithLabel {...{ id: "title", name: "title", type: "title" }} handleUpdate={handleRecipeUpdate} value={recipe.name} placeholder={"Awesome recipe name!"} />

                      <IngredientsGroup values={recipe.ingredients} handleUpdate={handleRecipeUpdate} />
                    </section>

                    <section id='AddRecipe-instructions' className="flex-1 ml-4 ">
                      <InstructionsArea handleUpdate={handleRecipeUpdate} />
                    </section>
                  </section>

                  <section id='AddRecipe-notes' className='flex-1'>
                    <NotesInput handleUpdate={handleRecipeUpdate} />
                  </section>

              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              {!recipeId
                ?
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Submit
                </button>
                :
                <button
                  type="button"
                  onClick={() => { }}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Update
                </button>
              }
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default AddRecipe;