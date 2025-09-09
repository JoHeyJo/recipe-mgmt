type PillButton = {
  action: string;
};

/** Reusable pill button component
 *
 * [Login, SignUp] -> PillButton
 */

export function PillButton({ action }: PillButton) {
  // console.log("pressed")
  return (
    <button
    onClick={()=>console.log("pressed")}
      type="submit"
      id="PillButton"
      className="rounded-full px-3.5 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-light-border"
    >
      {action}
    </button>
  );
}
