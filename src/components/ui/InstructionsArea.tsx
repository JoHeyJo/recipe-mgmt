import { useState, useEffect } from "react";
import { Ingredient, Instruction, Instructions } from "../../utils/types";
import InstructionManager from "./InstructionManager";
import API from "../../api";
import { errorHandling } from '../../utils/ErrorHandling';

const placeHolder = ["Add ingredients...", "Add ice...", "shake..."]

const InstructionsTemplate: Instructions = []

/** InstructionsArea
 * 
 * Dynamically renders list of instructions - filters out selected options
 * 
 * AddRecipe -> InstructionsArea -> InstructionsManager
 */
function InstructionsArea() {
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [selectedInstructions, setSelectedInstructions] = useState<Instruction[]>([]);

  /** Add selected instruction to incoming data set  */
  function addInstruction(instruction: Instruction, index: number) {
    setInstructions((i: Instruction[]) => {
      const updatedInstructions = [...i];
      updatedInstructions.push(instruction);
      return updatedInstructions;
    })
  }

  /** Update selected instructions */
  function updateInstructionSelection(instruction: Instruction, index: number) {
    setSelectedInstructions((i: Instruction[]) => {
      const updatedInstructions = [...i];
      // updatedInstructions.splice(index + 1, 1)
      // console.log("updatedInstructions", updatedInstructions)
      updatedInstructions.push(instruction);
      return updatedInstructions;
    })
  }

  /** Consolidates selection functionality */
  function handleSelected(instruction: Instruction, index: number) {
    // addInstruction(instruction, index)
    filterInstructions(index)

  }

  function filterInstructions(index: number) {
    setInstructions(i => {
      const updatedInstructions = [...i]
      updatedInstructions.splice(index, 1)
      return updatedInstructions
    })
  }

  /** Create additional input field for new instruction */
  function createInstructionInput() {
    setInstructions((i: Instruction[]) => [...i, { id: "temp-", instruction: "some other thing..." }])
  }

  /** Request to create new instruction */
  async function addIngredient(ingredient: Ingredient) {
    try {
      const id = await API.postIngredient(ingredient);
      return id
    } catch (error: any) {
      errorHandling("InstructionsArea - addIngredient", error)
    }
  }

  /** Consolidates logic pertaining to adding instructions */
  const manageInstructions = {
    postIngredient: addIngredient,
    handleAdd: addInstruction,
    createInstructionInput,
    updateInstructionSelection,
    handleSelected
  }

  // already added instructions should not be shown....

  /** Populate instruction area on mount */
  useEffect(() => {
    async function fetchInstructions() {
      const res = await API.getInstructions()
      setInstructions((prevInstructions: any) => {
        const newInstructions = { ...prevInstructions }; // Make a shallow copy of the previous state
        [1, 2, 3].forEach(i => {
          newInstructions[i] = res; // Update the copied object
        });
        return newInstructions; // Return the new object
      });
    }
    fetchInstructions()
  }, [])

  return (
    <div id="InstructionsArea" className="block w-full h-full rounded-md border px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 sm:leading-6">
      {placeHolder.map((i, index) =>
        <InstructionManager
          key={index}
          index={index}
          name={i}
          handleOptionChange={() => { }}
          options={instructions}
          manageInstructions={manageInstructions} />
      )}
    </div>
  )
}

export default InstructionsArea;