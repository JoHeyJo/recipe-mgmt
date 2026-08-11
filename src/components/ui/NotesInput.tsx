import { useState, useEffect, ChangeEvent, useContext } from "react";
import { NotesInputProps } from "../../utils/props";
import { RecipeContext } from "../../context/RecipeContext";
import FormLabel from "./common/Label";
import { Field } from "@headlessui/react";

/** Render Notes
 *
 * RecipeRequests -> NotesInput
 */
function NotesInput({ onNotesInput }: NotesInputProps) {
  const { selectedRecipe } = useContext(RecipeContext);
  const [notes, setNotes] = useState<string>(selectedRecipe.notes);

  /** handles changes in notes */
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNotes(event.target.value);
    onNotesInput(event.target.value, "notes");
  }

  /** handles parent state changes */
  useEffect(() => {
    onNotesInput(notes, "notes");
  }, [notes]);

  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1 pt-4">
        <Field >
            <FormLabel label={"Notes:"} />
            <textarea
              onChange={handleChange}
              id="notes"
              name="notes"
              rows={3}
              placeholder="Serve on rocks or ice..."
              className="block w-full resize-none rounded-xl p-2 border-2 border-gray-300 bg-accent placeholder:text-gray-500 focus:border-gray-800 focus:ring-0 sm:text-sm sm:leading-6"
              defaultValue={notes}
            />
        </Field>
      </div>
    </div>
  );
}

export default NotesInput;
