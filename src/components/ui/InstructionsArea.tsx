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
  const [instructions, setInstructions] = useState([]);
  const [selectedInstructions, setSelectedInstructions] = useState<Instruction[]>([]);
  const [filterKey, setFilterKeys] = useState({});

  /** Add selected instruction to incoming data set  */
  function addInstruction(instruction: Instruction) {
    setInstructions((i: Instruction[]) => {
      const updatedInstructions = [...i];
      updatedInstructions.push(instruction);
      return updatedInstructions;
    })
  }

  /** Update selected instructions */
  function updateInstructionSelection(instruction: Instruction, arrayKey: number) {
    setSelectedInstructions((i: Instruction[]) => {
      const updatedInstructions = [...i];
      updatedInstructions[arrayKey] = instruction;
      console.log(updatedInstructions)
      return updatedInstructions;
    })
  }

  /** Remove unselected instruction */
  function removeInstructionSelection(instructionId: number) {
    setSelectedInstructions(instructions =>
      instructions.filter(instruction => instruction.id !== instructionId)
    )
  }

  /** Remove unselected filter key */
  function removeFilterKey(arrayKey: number) {
    setFilterKeys(keys => {
      const updatedKeys = { ...keys }
      delete updatedKeys[arrayKey]
      return updatedKeys;
    })
  }

  /** Constructs key value pair of filters keys with array id & option id and updates filter keys */
  function updateFilterKeys(keys: number[]) {
    setFilterKeys(prevKeys => {
      const updatedKeys = { ...prevKeys }
      const newKeySet = { [keys[0]]: keys[1] }
      return { ...updatedKeys, ...newKeySet }
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
  const handleInstructions = {
    addIngredient,
    addInstruction,
    createInstructionInput,
    updateInstructionSelection,
    updateFilterKeys,
    removeInstructionSelection,
    removeFilterKey
  }

  /** Populate instruction area on mount */
  useEffect(() => {
    async function fetchInstructions() {
      const res = await API.getInstructions()
      setInstructions(res)
    }
    fetchInstructions()
  }, [])

  /** Filter selected items from subsequent arrays */
  // filtered down to just the elements from the given array that pass the test 
  function filterSelected(instructions: Instructions, arrayKey: number) {
    // If no item is selected in this dropdown, show all options
    if (!filterKey[arrayKey]) return instructions

    return instructions.filter((instruction, index) => {

      // if(arrayKey !== index) return filterKey[arrayKey] !== instruction.id
      // If we are rendering the dropdown with the selected item (arrayKey matches), show all options including the selected one
      if (filterKey[arrayKey]) return true

      // In other dropdowns (arrayKey !== current arrayKey), filter out the selected item
      // return filterKey[instruction.id]
    })

  }

  return (
    <div id="InstructionsArea" className="block w-full h-full rounded-md border px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 sm:leading-6">
      {placeHolder.map((i, index) =>
        <InstructionManager
          key={index}
          index={index}
          arrayKey={index}
          name={i}
          handleOptionChange={() => { }}
          options={filterSelected(instructions, index)}
          handleInstructions={handleInstructions}
        />
      )}
    </div>
  )
}

export default InstructionsArea;