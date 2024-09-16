import { useState, useEffect } from "react";
import { Ingredient, Instruction, Instructions } from "../../utils/types";
import InstructionManager from "./InstructionManager";
import API from "../../api";
import { errorHandling } from '../../utils/ErrorHandling';

const placeHolder = ["Add ingredients...", "Add ice...", "shake..."]

const InstructionsTemplate: Instructions = []

/** InstructionsArea
 * 
 * Dynamically renders list of instructions 
 * 
 * AddRecipe -> InstructionsArea -> InstructionsManager
 */
function InstructionsArea() {
  const [instructions, setInstructions] = useState<Instruction[]>([]);

  /** Add instruction to state */
  function addInstruction(instruction: Instruction, index: number) {
    setInstructions((i: Instruction[]) => {
      const updatedInstructions = [...i];
      updatedInstructions[index] = instruction;
      return updatedInstructions;
    })
  }

  /** Create additional input field for new instruction */
  function createInstructionInput() {
    setInstructions((i: Instruction[]) => [...i, { id: "temp-", instruction: "some other thing..." }])
  }

  /** Request to create new instruction */
  async function addIngredient(ingredient: Ingredient) {
    try{
      const id = await API.postIngredient(ingredient);
      return id
    } catch (error: any) {
      errorHandling("InstructionsArea - addIngredient", error)
    }
  }

  /** Consolidates logic pertaining to adding instructions */
  const manageInstructions = {
    postIngredient:addIngredient,
    handleAdd: addInstruction,
    newInstructionInput: createInstructionInput
  }

  // already add instructions should not be shown....

  /** Populate instruction area on mount */
  useEffect(() => {
    async function fetchInstructions(){
      const res = await API.getInstructions()
      setInstructions(res);
    }
    fetchInstructions()
  },[])

  return (
    <div id="InstructionsArea" className="block w-full h-full rounded-md border px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 sm:leading-6">
      {placeHolder.map((i, index) =>
        <InstructionManager
          key={index}
          index={index}
          name={i}
          handleOptionChange={() => { }}
          options={instructions.filter(i => typeof i.id !== "number")}
          handleAdd={addInstruction}
          manageInstructions={manageInstructions} />
      )}
    </div>
  )
}

export default InstructionsArea;