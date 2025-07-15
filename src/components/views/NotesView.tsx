import { NotesViewProp } from "../../utils/props";

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
      className={`flex ${isNotesEmpty ? "py-4" : ""} border-b-2 sm:gap-4 sm:pl-3`}
    >
      <div className="basis-1/6 self-center font-medium leading-6">Notes:</div>
      <ul className="basis-5/6 divide-y divide-border-color">
        {notes &&
          notes.split("\n").map((notes, id) => (
            <div
              key={id}
              id="NotesView-notes"
              className={`                  ${
                prevSectionLength % 2 === 0
                  ? "odd:bg-accent even:bg-accent-secondary"
                  : "odd:bg-accent odd:bg-accent-secondary"
              }`}
            >
              <li className="flex py-2 pl-2 space-x-4">{notes}</li>
            </div>
          ))}
      </ul>
    </div>
  );
}

export default NotesView;
