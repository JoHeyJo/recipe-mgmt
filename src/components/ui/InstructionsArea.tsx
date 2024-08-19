import { useState } from "react";
import { Instruction, Instructions } from "../../utils/types";
import InstructionComboboxWithSearch from "./InstructionComboboxWithSearch";



const defaultInstruction = [
  { id: undefined, instruction: "Add ingredients..." },
  { id: undefined, instruction: "Add ice..." },
  { id: undefined, instruction: "shake..." }
]

const InstructionsTemplate: Instructions = []

export default function InstructionsArea() {
  const [instructions, setInstructions] = useState<Instruction[]>(defaultInstruction);

  /** Add additional instruction to state */
  function addInstruction(instruction: Instruction, index: number) {
    setInstructions((i: Instruction[]) => [...i, i[index] = instruction])
  }

  return (
    <div id="InstructionsArea" className="block w-full h-full rounded-md border px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 sm:leading-6">
      {instructions.map((i, index) =>
        <InstructionComboboxWithSearch 
          key={index} 
          name={i.instruction} 
          handleOptionChange={() => { }} 
          options={[]} 
          handleAdd={addInstruction} />
      )}
    </div>
  )
}
