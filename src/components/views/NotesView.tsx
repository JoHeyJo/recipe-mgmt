import { NotesViewProp } from "../../utils/props";
import { styleRecipeRows } from "../../utils/functions";

/** Renders list of notes
 *
 *
 * RecipeView -> NotesView
 */
function NotesView({ notes, prevSectionLength }: NotesViewProp) {
  /**Guards against rendering empty data */
  function shouldNotesRender() {
    return notes;
  }

  const isNotesEmpty = !notes;
  return (
    <div
      id="NotesView-container"
      className={`flex ${isNotesEmpty ? "py-4" : ""} bg-data-hover border-b-2 border-secondary sm:gap-4 sm:pl-3`}
    >
      <div className="basis-1/6 self-center font-medium leading-6">Instructions:</div>
      <ul className="basis-5/6 divide-y divide-border-color">
        {notes &&
          notes.split("\n").map((notes, id) => (
            <div key={id} id="NotesView-notes" className="">
              <li
                className={` flex py-2 pl-2 space-x-4 ${styleRecipeRows(id, prevSectionLength)}`}
              >
                {notes}
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
}

export default NotesView;
