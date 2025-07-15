import { InstructionsViewProp } from "../../utils/props";
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
      className={`${isInstructionsEmpty ? "py-4" : ""} bg-data-hover border-b-2 flex sm:gap-4 sm:pl-3`}
    >
      <section className="basis-1/6 self-center font-medium leading-6">
        Instructions:
      </section>
      <ol className="basis-5/6 divide-y divide-border-color">
        {shouldInstructionsRender() &&
          instructions.map(({ instruction, id }, i) => (
            <li
              key={id}
              id="InstructionsView-instruction"
              className={`flex py-2 pl-2 space-x-4 ${
                prevSectionLength % 2 === 0
                  ? "odd:bg-accent even:bg-accent-secondary"
                  : "even:bg-accent odd:bg-accent-secondary"
              }`}
            >
              <div className="leading-6 sm:col-span-2 sm:mt-0">
                {instruction}
              </div>
            </li>
          ))}
      </ol>
    </div>
  );
}

export default InstructionsView;
