export default function FormContainer() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    // Root: fills its parent. Parent must have a real height (h-screen, h-full, or a grid/flex track).
    <form
      onSubmit={handleSubmit}
      className="flex h-full w-full flex-col gap-3 p-3"
    >
      {/* ── Row 1: half the container. Stacks on mobile, two columns from md up. */}
      <div className="flex min-h-0 shrink-0 basis-1/2 flex-col gap-3 md:flex-row">
        {/* Left column */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
          {/* Fixed-height input, sized for a line of text */}
          <input
            type="text"
            placeholder="Name this batch"
            className="w-full shrink-0 rounded border border-slate-300 px-3 py-2 text-sm outline-none focus-visible:border-slate-500 focus-visible:ring-2 focus-visible:ring-slate-300"
          />

          {/* Grows with its contents, scrolls once it runs out of room */}
          <div className="min-h-0 w-full flex-1 overflow-y-auto rounded border border-dashed border-slate-300 p-3">
            {/* items go here */}
          </div>
        </div>

        {/* Right column: single box filling the rest of the row */}
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto rounded border border-dashed border-slate-300 p-3">
          {/* content */}
        </div>
      </div>

      {/* ── Row 2: takes whatever height is left */}
      <div className="min-h-0 w-full flex-1 overflow-y-auto rounded border border-dashed border-slate-300 p-3">
        {/* content */}
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
