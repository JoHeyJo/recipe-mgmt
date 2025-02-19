import { useState, useEffect, useContext, ChangeEventHandler, ChangeEvent } from "react";
import { Instruction, Instructions } from "../../utils/types";
import InstructionManager from "../views/InstructionManager";
import { InstructionsAreaProps } from "../../utils/props";
import { UserContext } from "../../context/UserContext";
import { PLACE_HOLDER } from "../../utils/templates";

const InstructionsTemplate: Instructions = []

/** Triggers creation of input if there are no inputs left (num of inputs = array index)
 * This doesn't work with refactoring of PLACE_HOLDER instructions
 */
const HAS_NO_REMAINING_INPUT = (inputs: number, arrayKey: number) => inputs - 1 === arrayKey

/** InstructionsArea handles selected instruction
 * 
 * Dynamically renders list of instructions - filters out selected options
 * 
 * InstructionsRequests -> InstructionsArea -> InstructionManager
 */
function InstructionsArea({ handleRecipe, instructions, handleInstruction }: InstructionsAreaProps) {
  const { userId, currentBookId } = useContext(UserContext)
  // const [instructions, setInstructions] = useState([]);
  const [selectedInstructions, setSelectedInstructions] = useState<Instructions>(PLACE_HOLDER);
  const [filterKey, setFilterKeys] = useState({});

  /** Update list of selected instructions */
  async function updateSelected(instruction: Instruction, arrayKey: number) {
    setSelectedInstructions((i: Instruction[]) => {
      const updatedInstructions = [...i];
      updatedInstructions[arrayKey] = instruction;
      return updatedInstructions;
    })

    if (instructions.selected === "user") handleInstruction.associate(userId, currentBookId, +instruction.id)

    if (HAS_NO_REMAINING_INPUT(selectedInstructions.length, arrayKey)) createInstructionInput();
  }

  /** Remove unselected instruction */
  function removeSelected(instructionKey: number) {
    setSelectedInstructions(instructions => {
      const alteredInstructions = [...instructions];
      alteredInstructions[instructionKey] = PLACE_HOLDER[instructionKey] || { id: null, "instruction": "some other thing..." }
      return alteredInstructions
    })
  }

  /** Remove unselected filter key */
  // function removeFilterKey(arrayKey: number) {
  //   setFilterKeys(keys => {
  //     const updatedKeys = { ...keys }
  //     delete updatedKeys[arrayKey]
  //     return updatedKeys;
  //   })
  // }

  /** Constructs key value pair of filters keys with array id & option id and updates filter keys */
  // function updateFilterKeys(keys: number[]) {
  //   setFilterKeys(prevKeys => {
  //     const updatedKeys = { ...prevKeys }
  //     const newKeySet = { [keys[0]]: keys[1] }
  //     return { ...updatedKeys, ...newKeySet }
  //   })
  // }

  /** Create additional input field for new instruction */
  function createInstructionInput() {
    setSelectedInstructions(selected => [...selected, { id: null, instruction: "some other thing..." }])
  }

  /** Consolidates logic pertaining to adding instructions */
  const handleInstructions = {
    addInstruction,
    addCreated,
    createInstructionInput,
    updateSelected,
    // updateFilterKeys,
    removeSelected,
    // removeFilterKey
  }

  /** Filter selected items from subsequent arrays */
  // filtered down to just the elements from the given array that pass the test 
  // function filterSelected(instructions: Instructions, arrayKey: number) {
  //   // If no item is selected in this dropdown, show all options
  //   if (!filterKey[arrayKey]) return instructions
  //   return instructions.filter((instruction, index) => {

  //     // if(arrayKey !== index) return filterKey[arrayKey] !== instruction.id
  //     // If we are rendering the dropdown with the selected item (arrayKey matches), show all options including the selected one
  //     if (filterKey[arrayKey]) return true

  //     // In other dropdowns (arrayKey !== current arrayKey), filter out the selected item
  //     // return filterKey[instruction.id]
  //   })
  // }

  /** Updates parent state of instructions when instructions is changed and on mount */
  useEffect(() => {
    handleUpdate(selectedInstructions.filter((i => i.id)), "instructions")
  }, [selectedInstructions])


  return (
    <div id="InstructionsArea" className="block w-full h-full rounded-md border px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 sm:leading-6">
      {selectedInstructions.map((value, index) =>
        <InstructionManager
          key={index}
          arrayKey={index}
          instruction={value}
          // options={filterSelected(instructions, index)}
          handleInstructions={handleInstructions}
        />
      )}
    </div>
  )
}

export default InstructionsArea;