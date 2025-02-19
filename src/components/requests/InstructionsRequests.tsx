import { useState, useContext, useEffect, ChangeEvent } from "react";
import { UserContext } from "../../context/UserContext";
import { RecipeContext } from "../../context/RecipeContext";
import { Ingredient } from "../../utils/types";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";
import InstructionsArea from "../ui/InstructionsArea";

/** Handles API requests for Instructions 
 * 
 * RecipeRequests -> InstructionsRequests -> InstructionsArea
*/
function InstructionsRequests() {
  const { userId, currentBookId } = useContext(UserContext)
  const { requestAction, contextInstructions } = useContext(RecipeContext);
  const [instructions, setInstructions] = useState([]);
  const [whichInstructions, setWhichInstructions] = useState("book");

  /** handle state change for whichInstructions */
  function handleRadio(event: ChangeEvent<HTMLInputElement>) {
    setWhichInstructions(event.target.value)
  }

  /** Request to create new instruction */
  async function addInstruction(ingredient: Ingredient) {
    try {
      const id = await API.postInstruction(userId, currentBookId, ingredient);
      return id
    } catch (error: any) {
      errorHandling("InstructionsArea - addInstruction", error)
      throw error
    }
  }

  /** Fetch instructions associated to Book */
  async function fetchBookInstructions() {
    const res = await API.getBookInstructions(userId, currentBookId)
    setInstructions(res)
  }

  /** Fetch instructions associated to User */
  async function fetchUserInstructions() {
    const res = await API.getUserInstructions(userId);
    setInstructions(res)
  }

  /** Automatically associates "global user" instructions to current book on select */
  async function associateInstructionToBook(userId: number, currentBookId: number, instructionId: number) {
    try {
      const res = await API.postInstructionAssociation(userId, currentBookId, instructionId)
    } catch (error: any) {
      errorHandling("InstructionsArea - associateInstructionToBook", error)
      throw error
    }
  }

  const handleRequests = {
    post: addInstruction,
    associate: associateInstructionToBook
  }

  /** Populate instruction area on mount */
  useEffect(() => {
    whichInstructions == "book" ? fetchBookInstructions() : fetchUserInstructions()
  }, [whichInstructions])

  // On mount, populate instructions if recipe is selected
  useEffect(() => {
    if (requestAction === "edit") {
      // setSelectedInstructions(contextInstructions)
      // createInstructionInput()
    } else {
      // setSelectedInstructions(PLACE_HOLDER)
    }
  }, [])

  return (
    <>
      <RadioSwitch handleSwitch={handleRadio} selection={whichInstructions} />
      <InstructionsArea />
    </>
  )

}

export default InstructionsRequests