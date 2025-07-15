import { useState, useEffect, ChangeEvent, useContext } from "react";
import { NotesInputProps } from "../../utils/props";
import { RecipeContext } from "../../context/RecipeContext";

/** Render Notes
 *
 * RecipeRequests -> NotesInput
 */
function NotesInput({ handleUpdate }: NotesInputProps) {
  const { selectedNotes } = useContext(RecipeContext);
  const [notes, setNotes] = useState<string>(selectedNotes);

  /** handles changes in notes */
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNotes(event.target.value);
    handleUpdate(event.target.value, "notes");
  }

  /** handles parent state changes */
  useEffect(() => {
    handleUpdate(notes, "notes");
  }, [notes]);

  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <form action="#">
          <div className="NotesInput-text focus-within:border-gray-800">
            <label htmlFor="notes" className=""></label>
            <textarea
              onChange={handleChange}
              id="notes"
              name="notes"
              rows={3}
              placeholder="Notes: Serve on rocks or ice..."
              className="block w-full resize-none rounded-xl mt-3 p-2 border-2 border-gray-300 bg-accent placeholder:text-gray-500 focus:border-gray-800 focus:ring-0 sm:text-sm sm:leading-6"
              defaultValue={notes}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default NotesInput;
