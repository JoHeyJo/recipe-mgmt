import { useState } from "react";
import DropDownWithSearch from "../selectors/DropDownWithSearch"
import { Instruction, Instructions } from "../../utils/types";



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
        <DropDownWithSearch key={index} name={i.instruction} handleOptionChange={() => { }} options={[]} handleAddOption={() => { }} />
      )}
    </div>
  )
}
