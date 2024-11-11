import { useState, useEffect, useContext } from "react";
import { Ingredient, Instruction, Instructions } from "../../utils/types";
import InstructionManager from "./InstructionManager";
import API from "../../api";
import { errorHandling } from '../../utils/ErrorHandling';
import { InstructionsAreaProps } from "../../utils/props";
import { RecipeContext } from "../../context/RecipeContext";

const PLACE_HOLDER = ["Add ingredients...", "Add ice...", "shake..."]

const InstructionsTemplate: Instructions = []

/**  Triggers creation of input if num of inputs = array index & more than 2 are needed*/
const HAS_NO_REMAINING_INPUT = (inputs: number, arrayKey: number) => inputs >= 2 && inputs - 1 === arrayKey

/** InstructionsArea - Makes requests for instructions
 * 
 * Dynamically renders list of instructions - filters out selected options
 * 
 * AddRecipe -> InstructionsArea -> InstructionsManager
 */
function InstructionsArea({ handleUpdate }: InstructionsAreaProps) {
  const [instructions, setInstructions] = useState([]);
  const [selectedInstructions, setSelectedInstructions] = useState<any>(PLACE_HOLDER);
  const [filterKey, setFilterKeys] = useState({});

  const { requestAction, contextInstructions } = useContext(RecipeContext);

  // On mount, populate instructions if recipe is selected
  useEffect(() => {
    if (requestAction === "edit") setSelectedInstructions(contextInstructions);
  }, [])

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
      return updatedInstructions;
    })
    if (HAS_NO_REMAINING_INPUT(selectedInstructions.length, arrayKey)) createInstructionInput()
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
    setSelectedInstructions(selected => [...selected, "some other thing..."])
    // PLACE_HOLDER.push("some other thing...")
  }

  /** Request to create new instruction */
  async function addIngredient(ingredient: Ingredient) {
    try {
      const id = await API.postIngredient(ingredient);
      return id
    } catch (error: any) {
      errorHandling("InstructionsArea - addIngredient", error)
      throw error
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

  useEffect(() => {
    handleUpdate(selectedInstructions, "instructions")
  }, [selectedInstructions])

  return (
    <div id="InstructionsArea" className="block w-full h-full rounded-md border px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 sm:leading-6">
      {selectedInstructions.map((value, index) =>
        <InstructionManager
          key={index}
          arrayKey={index}
          name={value.instruction}
          handleOptionChange={() => { }}
          options={filterSelected(instructions, index)}
          handleInstructions={handleInstructions}
        />
      )}
    </div>
  )
}

export default InstructionsArea;