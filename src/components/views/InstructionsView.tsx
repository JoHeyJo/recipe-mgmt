import { InstructionsViewProp } from "../../utils/props";
import { styleRecipeRows } from "../../utils/functions";
import { Instructions } from "../../utils/types";

/** Renders list of instructions
 *
 *
 * RecipeView -> InstructionsView
 */
function InstructionsView({
  instructions,
  prevSectionLength,
}: InstructionsViewProp) {
  /**Guards against rendering empty data */
  function shouldInstructionsRender() {
    return instructions[0].id !== 0;
  }

  const isInstructionsEmpty = instructions[0].id === 0;

  return (
    <div
      className={`${isInstructionsEmpty ? "py-4" : ""} bg-data-hover border-b-2 border-secondary flex sm:gap-4 sm:pl-3`}
    >
      <div className="basis-1/6 self-center font-medium leading-6">
        Instructions:
      </div>
      <div className="basis-5/6 divide-y divide-border-color">
        {shouldInstructionsRender() &&
          instructions.map(({ instruction, id }, i) => (
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
