import { useState, ChangeEventHandler, ChangeEvent } from "react";
import { NotesInputProps } from "../../utils/props"

function NotesInput({ handleUpdate }: NotesInputProps) {
  const [notes, setNotes] = useState<string>();

  /** handles changes in notes */
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>){
    setNotes(event.target.value)
    handleUpdate(event.target.value, "notes")
  }

  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <form action="#">
          <div className="NotesInput-text border-b border-gray-200 focus-within:border-gray-800">
            <label htmlFor="notes" className="sr-only">
            </label>
            <textarea
              onChange={handleChange}
              id="notes"
              name="notes"
              rows={1}
              placeholder="Notes..."
              className="block w-full pt-9 resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-gray-800 focus:ring-0 sm:text-sm sm:leading-6"
              defaultValue={''}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default NotesInput