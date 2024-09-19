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
  const [arrayKeys, setArrayKey] = useState({});

  // function updateArrayKeys(){
  //   setArrayKey()
  // }

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
  function handleSelected(instruction: Instruction, keys, ingredientId: number) {
    setFilterKeys(prevKeys => {
      const updatedKeys = { ...prevKeys }
      const newKeySet = { [keys[0]] : keys[1]}
      return { ...updatedKeys, ...newKeySet }
    })
  }

  /** Filter selected items from subsequent arrays */
  function filterInstructions(arrayKey: number, ingredientId: number) {
    setInstructions(i => {
      const updatedInstructions = { ...i }
      for (let key in updatedInstructions) {
        if (+key !== arrayKey) {
          updatedInstructions[key] = updatedInstructions[key].filter(i => i.id !== ingredientId)
        }
      }
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

  /** Populate instruction area on mount */
  useEffect(() => {
    async function fetchInstructions() {
      const res = await API.getInstructions()
      setInstructions(res)
    }
    fetchInstructions()
  }, [])

  return (
    <div id="InstructionsArea" className="block w-full h-full rounded-md border px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 sm:leading-6">
      {placeHolder.map((i, index) =>
        <InstructionManager
          key={index}
          arrayKey={index}
          name={i}
          handleOptionChange={() => { }}
          options={instructions.filter((i) => {
            // if (!filterKey[index]) return
            if(!filterKey[index])
            return !filterKey[index]
          })}
          manageInstructions={manageInstructions} />
      )}
    </div>
  )
}

export default InstructionsArea;