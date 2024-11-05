import { useState, useEffect, ChangeEvent, useContext } from "react";
import { NotesInputProps } from "../../utils/props"
import { RecipeContext } from "../../context/RecipeContext";


/** Render Notes 
 * 
 * 
 * AddRecipe -> NotesInput
 */
function NotesInput({ handleUpdate }: NotesInputProps) {
  const [notes, setNotes] = useState<string>();

  const { selectedNotes } = useContext(RecipeContext)

    useEffect(()=>{
      setNotes(selectedNotes);
    },[])

  /** handles changes in notes */
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNotes(event.target.value)
    handleUpdate(event.target.value, "notes")
  }

  useEffect(() => {
    handleUpdate(notes, "notes")
  }, [notes])

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
              className="block w-full pt-9 resize-none border-0 border-b border-transparent p-0 pb-2 placeholder:text-gray-400 focus:border-gray-800 focus:ring-0 sm:text-sm sm:leading-6"
              defaultValue={notes}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default NotesInput;