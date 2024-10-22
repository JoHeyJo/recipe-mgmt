import { NotesViewProp } from "../../utils/props";

/** Renders list of notes
 * 
 * 
 * RecipeView -> NotesView
 */
function NotesView({ notes }: NotesViewProp) {
  return (
    <div className="flex px-4 py-6 sm:gap-4 sm:px-3">
      <div className="basis-1/3 self-center text-sm font-medium leading-6 text-gray-900">Notes:</div>
      <div className="basis-2/3 space-y-4 ml-4">
        {notes.map((notes, id) =>
        <div key={id} id="NotesView-note" className="flex space-x-4">
            <p className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{notes}</p>
        </div>
        )}
      </div>
    </div>
  );
}

export default NotesView;