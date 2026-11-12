import type { FormEvent, ReactNode } from "react";

type FormContainerProps = {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  /** Content for the overflow area under the text input (top row, left column). */
  leftPanel?: ReactNode;
  /** Content for the overflow area in the top row's right column. */
  rightPanel?: ReactNode;
  /** Content for the second row. */
  secondRow?: ReactNode;
};

/*
 * Layout
 *   Row 1 (3 shares)  two columns at md+, stacked below md
 *   Row 2 (2 shares)  full width
 *   Row 3 (auto)      submit button only
 *
 * The form fills its parent (h-full w-full), so the Dialog panel decides the size.
 *
 * Every growing region uses a 0px flex-basis, so its size comes from the
 * available space and never from its content. That is what makes the panes
 * scroll instead of stretching the form once they are filled.
 *
 * Below md the panes keep a minimum height; if the dialog is too short to fit
 * them all, the form itself scrolls.
 */
const pane =
  "min-h-40 min-w-0 flex-[1_1_0px] overflow-auto rounded-lg border border-red-500 md:min-h-0";

export function FormContainer({
  onSubmit,
  leftPanel,
  rightPanel,
  secondRow,
}: FormContainerProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex h-full w-full flex-col gap-4 overflow-y-auto"//DONE
    >
      {/* Row 1: two columns (stacked on mobile) */}
      <div className="flex flex-[3_1_0px] flex-col gap-4 md:min-h-0 md:flex-row"> //
        {/* Left column: text input + overflow pane */}
        <div className="flex min-w-0 flex-[1_1_0px] flex-col gap-3 md:min-h-0">
          <input
            type="text"
            name="text"
            aria-label="Text"
            placeholder="Enter text"
            className="w-full shrink-0 rounded-lg border border-red-500 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          />
          <div className={pane}>{leftPanel}</div>
        </div>

        {/* Right column: overflow pane */}
        <div className={pane}>{rightPanel}</div>
      </div>

      {/* Row 2 */}
      <div className="min-h-32 flex-[2_1_0px] overflow-auto rounded-lg border border-red-500 md:min-h-0">
        {secondRow}
      </div>

      {/* Row 3: submit */}
      <div className="flex shrink-0 justify-end">
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:w-auto"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
