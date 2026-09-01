function FormContainer() {
  // Visible outlines so the structure is easy to read
  const panel =
    "rounded-md border border-dashed border-neutral-300 bg-white min-h-0";
  const label =
    "text-xs font-semibold uppercase tracking-wider text-neutral-500";

  return (
    <div className="h-screen bg-neutral-50 p-4">
      <form className="flex h-full flex-col gap-3">
        {/* ─────────── Row 1: top half ─────────── */}
        {/* basis-1/2 shrink-0 = holds exactly half the container height */}
        {/* flex-col on mobile → flex-row on sm+ so columns stack on mobile */}
        <div className="flex basis-1/2 shrink-0 min-h-0 flex-col gap-3 sm:flex-row">
          {/* Left column: label, input on top, growing panel below */}
          <div className="flex flex-1 min-h-0 flex-col gap-2">
            <span className={label}>placeholder</span>
            <input
              type="text"
              placeholder="Title"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
            {/* Grows to fill remaining vertical space in this column */}
            <div className={`flex-1 ${panel}`} />
          </div>

          {/* Right column: label + single panel that fills the rest */}
          <div className="flex flex-1 min-h-0 flex-col gap-2">
            <span className={label}>placeholder</span>
            <div className={`flex-1 ${panel}`} />
          </div>
        </div>

        {/* ─────────── Row 2: fills what's left ─────────── */}
        <div className="flex flex-1 min-h-0 flex-col gap-2">
          <span className={label}>placeholder</span>
          <div className={`flex-1 ${panel}`} />
        </div>

        {/* ─────────── Row 3: submit button, full width ─────────── */}
        <button
          type="submit"
          className="w-full rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormContainer