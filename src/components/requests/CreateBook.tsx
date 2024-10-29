import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { BookOpenIcon } from '@heroicons/react/24/outline'
import TextInputTitle from '../ui/common/TextInputTitle';
import TextInputDescription from '../ui/common/TextInputDescription';
import { Book } from '../../utils/types';
import { ChangeEvent } from "react"
import API from '../../api';
import { errorHandling } from '../../utils/ErrorHandling';
import { useContext } from 'react';
import { UserContext } from '../../auth/UserContext';

type CreateBook = {
  isOpen: boolean;
  setOpen: () => void;
}

const defaultBook = { id: null, title: "", description: "" }
/** Renders modal that holds book information 
 * Request book creation associated to user
 * 
 * 
 * TopNav -> CreateBook -> [TextInputTitle, TextInputDescription]
 */
function CreateBook({ isOpen, setOpen }) {
  const [bookData, setBookData] = useState<Book>(defaultBook);

  const { userId, setUserData, currentBookId, defaultBookId } = useContext(UserContext);

  /** Handles changes to book data form */
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target
    setBookData(bookData => {
      const updatedBook = { ...bookData }
      updatedBook[name] = value;
      return updatedBook
    })
  }

  /** Consolidate modal closing actions */
  function handleClosingActions() {
    setBookData(defaultBook)
    setOpen(false);
  }

  /** Post request to create new book */
  async function createBook(bookData: Book, userId: number) {
    try {
      const res = await API.postBook(bookData, userId)
      const newId = res.id
      setUserData(user => {
        const updatedUser = { ...user }
        updatedUser.booksIds.push(newId)
        updatedUser.currentBookId = newId
        // ensure default book id
        if(!updatedUser.defaultBookId) updatedUser.defaultBookId = newId;
        return updatedUser;
      })
    } catch (error: any) {
      errorHandling("CreateBook - createBook", error)
    }
  }

  /** Handle submitting action */
  function handleSubmit(bookData: Book, userId: number) {
    createBook(bookData, userId)
    setBookData(defaultBook)
    setOpen(false);
  }
  const user = useContext(UserContext)
  return (
    <Dialog open={isOpen} onClose={handleClosingActions} className="relative z-10">
      <DialogBackdrop
        transition
        className="CreateBook-container fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                <BookOpenIcon aria-hidden="true" className="h-6 w-6 text-blue-600" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" className="text-base font-semibold leading-6">
                  <TextInputTitle handleChange={handleChange} title={bookData.title} />
                </DialogTitle>
                <div className="CreateBook-description mt-6">
                  <TextInputDescription handleChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="button"
                onClick={() => handleSubmit(bookData, userId)}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
              >
                Submit
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => handleClosingActions()}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
export default CreateBook;