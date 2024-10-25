import { NotesViewProp } from "../../utils/props";

/** Renders list of notes
 * 
 * 
 * RecipeView -> NotesView
 */
function NotesView({ notes }: NotesViewProp) {
  return (
    <div className="flex bg-white px-4 py-6 sm:gap-4 sm:px-3">
      <div className="basis-1/3 self-center text-sm font-medium leading-6 text-gray-900">Notes:</div>
      <ol className="basis-2/3 space-y-4 ml-4">
        {notes.split("\n").map((notes, id) =>
        <div key={id} id="NotesView-notes" className="">
            <li className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{notes}</li>
        </div>
        )}
      </ol>
    </div>
  );
}

export default NotesView;