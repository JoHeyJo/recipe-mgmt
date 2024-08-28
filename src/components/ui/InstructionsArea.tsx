import { useState } from "react";
import { Instruction, Instructions } from "../../utils/types";
import InstructionManager from "./InstructionManager";



const defaultInstruction = [
  { id: null, instruction: "Add ingredients..." },
  { id: null, instruction: "Add ice..." },
  { id: null, instruction: "shake..." }
]

// const placeHolder = ["Add ingredients...", "Add ice...", "shake..."]

const InstructionsTemplate: Instructions = []

/** Renders list of instructions 
 * 
 * 
 * AddRecipe -> InstructionsArea -> InstructionsComboBoxArea (InstructionsManager)
 */
function InstructionsArea() {
  const [instructions, setInstructions] = useState<Instruction[]>(defaultInstruction);

  /** Add additional instruction to state */
  function addInstruction(instruction: Instruction, index: number) {
    setInstructions((i: Instruction[]) => [...i, i[index] = instruction])
  }

  /**  */

  return (
    <div id="InstructionsArea" className="block w-full h-full rounded-md border px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 sm:leading-6">
      {instructions.map((i, index) =>
        <InstructionManager 
          key={index}
          index={index} 
          name={i.instruction} 
          handleOptionChange={() => { }} 
          options={instructions} 
          handleAdd={addInstruction} 
          postRequest={()=>{}}/>
      )}
    </div>
  )
}

export default  InstructionsArea;