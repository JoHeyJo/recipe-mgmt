type PillButton = {
  action: string;
};

/** Reusable pill button component
 *
 * [Login, SignUp] -> PillButton
 */

export function PillButton({ action }: PillButton) {
  return (
    <button
      type="submit"
      id="PillButton"
      className="rounded-full px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
    >
      {action}
    </button>
  );
}
