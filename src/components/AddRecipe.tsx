import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import IngredientsGroup from './common/IngredientsGroup';
import { Ingredient, Recipe } from '../utils/types';
import InputWithLabel from './common/InputWithLabel'
import API from '../api';
import { errorHandling } from './common/ErrorHandling';
import DropDownWithSearch from './common/DropDownWithSearch';

type AddRecipe = {
  setShowing: any;
  isOpen: boolean;
}

const recipeTemplate: Recipe = {
  name: "",
  preparation: [],
  notes: [],
  ingredients: []
}

/** Processes all recipe data
 * 
 * RecipeView -> AddRecipe -> IngredientsGroup
 */

function AddRecipe({ setShowing, isOpen }: AddRecipe) {
  const [recipe, setRecipe] = useState<Recipe>(recipeTemplate);

  /** Updates recipe state */
  function updateRecipe(data: string | Ingredient[], section: string) {
    setRecipe(prevRecipe => (
      { ...prevRecipe, [section]: data }
    ));
  }

  /** Calls api to send recipe data */
  async function addRecipe() {
    try {
      const res = await API.postRecipe(recipe);
      console.log(res)

    } catch (error: any) {
      errorHandling("AddRecipe - addRecipe", error)
    }
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShowing}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                {/* Comment out and Image - Title - and Text */}
                {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Payment successful
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                      </p>
                    </div>
                  </div> */}
                <DropDownWithSearch name={'Ingredients'} handleOptionChange={() => {}} options={[]} handleAddOption={()=>{}} />
                <InputWithLabel handleUpdate={updateRecipe} value={recipe.name} />
                <IngredientsGroup handleUpdate={updateRecipe} />
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setShowing(false)}
                  >
                    Go back to dashboard
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  // onClick={}
                  >
                    Submit
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default AddRecipe;