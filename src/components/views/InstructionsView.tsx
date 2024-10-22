import { InstructionsViewProp } from "../../utils/props";

/** Renders list of instructions
 * 
 * 
 * RecipeView -> InstructionsView
 */
function InstructionsView({ instructions }: InstructionsViewProp) {
  return (
    <div className="bg-gray-50 px-4 py-6 sm:gap-4 sm:px-3">
      <dt className="text-sm font-medium leading-6 text-gray-900">Instructions</dt>
      {instructions.map(({ instruction, id }) =>
        <dd key={id} className="mt-1 text-sm leading-6 text-gray-700 sm:col-s .pan-2 sm:mt-0">{instruction}</dd>
      )}
    </div>
  );
}

export default InstructionsView;