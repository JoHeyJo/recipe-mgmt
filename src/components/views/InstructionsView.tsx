import { InstructionsViewProp } from "../../utils/props";
import { styleRecipeRows } from "../../utils/functions";

/** Renders list of instructions
 *
 *
 * RecipeView -> InstructionsView
 */
function InstructionsView({
  instructions,
  prevSectionLength,
}: InstructionsViewProp) {
  /** Apply padding when there is not ingredients data to render */
  const shouldPaddingBeApplied = () => {
    if (instructions.length === 0) return true;
    return instructions[0].id === 0;
  };
  return (
    <div className={`${shouldPaddingBeApplied() ? "py-6" : ""} flex sm:gap-4`}>
      <div className="basis-1/6 self-center text-sm font-medium leading-6">
        Instructions:
      </div>
      <div className="basis-5/6">
        {instructions.map(({ instruction, id }, i) => (
          <div
            key={id}
            id="InstructionsView-instruction"
            className={`flex py-2 pl-2 space-x-4 ${styleRecipeRows(i, prevSectionLength)}`}
          >
            <p className="leading-6 sm:col-span-2 sm:mt-0">{instruction}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InstructionsView;
