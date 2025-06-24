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
      return instructions.length > 1;
    }

  const isInstructionsEmpty = instructions[0].id === 0;

  return (
    <div className={`${isInstructionsEmpty ? "py-6" : ""} flex sm:gap-4`}>
      <div className="basis-1/6 self-center text-sm font-medium leading-6">
        Instructions:
      </div>
      <div className="basis-5/6">
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
