import { useState } from "react";
import { Instruction, Instructions } from "../../utils/types";
import InstructionManager from "./InstructionManager";



const defaultInstruction = [
  { id: "temp-1", instruction: "Add ingredients..." },
  { id: "temp-2", instruction: "Add ice..." },
  { id: "temp-3", instruction: "shake..." }
]

const placeHolder = ["Add ingredients...", "Add ice...", "shake..."]

const InstructionsTemplate: Instructions = []

/** InstructionsArea
 * 
 * Dynamically renders list of instructions 
 * 
 * AddRecipe -> InstructionsArea -> InstructionsManager
 */
function InstructionsArea() {
  const [instructions, setInstructions] = useState<Instruction[]>(defaultInstruction);

  /** Add additional instruction to state */
  function addInstruction(instruction: Instruction, index: number) {
    setInstructions((i: Instruction[]) => {
      const updatedInstructions = [...i];
      updatedInstructions[index] = instruction;
      return updatedInstructions;
    })
  }

  /** Create additional input field for new instruction */
  function createInstructionInput(){
    setInstructions((i: Instruction[]) => [...i, { id: "temp-", instruction: "some other thing..." }])
  }

  /** Consolidates logic pertaining to adding instructions */
  const manageInstructions = {
    handleInstruction: addInstruction,
    newInstructionInput: createInstructionInput
  }

  return (
    <div id="InstructionsArea" className="block w-full h-full rounded-md border px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 sm:leading-6">
      {instructions.map((i, index) =>
        <InstructionManager
          key={index}
          index={index}
          name={placeHolder[index]}
          handleOptionChange={() => { }}
          options={instructions.filter(i => {
            if (!(i.id as string).startsWith("temp-"))
              return i
          })}
          handleAdd={addInstruction}
          postRequest={() => { }}
          manageInstructions={manageInstructions} />
      )}
    </div>
  )
}

export default InstructionsArea;