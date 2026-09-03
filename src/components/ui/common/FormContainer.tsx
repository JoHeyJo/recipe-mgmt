import InstructionsRequests from "../../requests/InstructionsRequests";
import IngredientsGroup from "../../selectors/IngredientsGroup";
import NotesInput from "../NotesInput";
import TitleInput from "../TitleInput";

export default function FormContainer() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    // Root: fills its parent. Parent must have a real height (h-screen, h-full, or a grid/flex track).
    <form
      id="FormContainer-book"
      onSubmit={handleSubmit}
      className="flex flex-1 w-full flex-col"
    >
      {/* ── Row 1: half the container. Stacks on mobile, two columns from md up. */}
      <div
        id="FormContainer-title-ingredients"
        className="flex basis-5/6 sm:basis-3/5 flex-col gap-3 sm:flex-row"
      >
        {/* Left column */}
        <div
          id="FormContainer-title"
          className="flex min-h-0 min-w-0 flex-1 flex-col "
        >
          {/* Fixed-height input, sized for a line of text */}
          {/* <input
            className="w-full shrink-0 rounded border border-slate-300 px-3 py-2 text-sm outline-none focus-visible:border-slate-500 focus-visible:ring-2 focus-visible:ring-slate-300"
          /> */}
          <TitleInput onTitleInput={() => {}} />

          {/* Grows with its contents, scrolls once it runs out of room */}
          <div
            id="FormContainer-ingredients"
            className="min-h-0 w-full flex-1 overflow-y-auto"
          >
            {/* items go here */}
            <IngredientsGroup onIngredientInput={() => {}} />
          </div>
        </div>

        {/* Right column: single box filling the rest of the row */}
        <div className="min-h-0 min-w-0 flex-1 rounded p-3">
          <InstructionsRequests onInstructionInput={() => {}} />
        </div>
      </div>

      {/* ── Row 2: takes whatever height is left */}
      <div
        id="FormContainer-notes"
        className="min-h-0 w-full flex-1  overflow-y-auto"
      >
        <NotesInput onNotesInput={() => {}} />
      </div>

      {/* ── Row 3: just the button, sized to its content */}
      <div className="shrink-0">
        <button
          type="submit"
          className="w-full rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white outline-none hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          Save
        </button>
      </div>
    </form>
  );
}
