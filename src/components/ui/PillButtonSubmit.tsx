type PillButtonSubmit = {
  action: string;
};

/** Reusable pill button component
 *
 * [Login, SignUp] -> PillButtonSubmit
 */

export function PillButtonSubmit({ action }: PillButtonSubmit) {
  return (
    <button
      type="submit"
      id="PillButtonSubmit"
      className="rounded-full px-3.5 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-light-border"
    >
      {action}
    </button>
  );
}
