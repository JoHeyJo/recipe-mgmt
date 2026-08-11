import { useState, useContext, useEffect, ChangeEvent } from "react";
import { UserContext } from "../../context/UserContext";
import { Instruction, Instructions } from "../../utils/types";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";
import InstructionsArea from "../ui/InstructionsArea";
import RadioSwitch from "../ui/common/RadioSwitch";
import { InstructionsRequestsProp } from "../../utils/props";
import FormLabel from "../ui/common/Label";
import { Field } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
// utils/scrollIntoKeyboardSafeView.ts

/** Handles API requests & instructionRequestAPI management for Instructions
 *
 * RecipeRequests -> InstructionsRequests -> InstructionsArea
 */
function InstructionsRequests({
  onInstructionInput,
}: InstructionsRequestsProp) {
  const { userId, currentBookId } = useContext(UserContext);
  const [instructions, setInstructions] = useState<Instructions>([]);
  const [whichInstructions, setWhichInstructions] = useState("book");
  const [instructionsReferences, setInstructionsReferences] = useState();

  /** handle state change for whichInstructions */
  function handleRadio(event: ChangeEvent<HTMLInputElement>) {
    setWhichInstructions(event.target.value);
  }

  /** Add newly created instruction (DB return object) to list of available instructions */
  function updateAvailableInstructions(instruction: Instruction) {
    setInstructions((i: Instruction[]) => {
      const updatedInstructions = [...i];
      updatedInstructions.push(instruction);
      return updatedInstructions;
    });
  }

  /** Request to create new instruction */
  async function addInstruction(instruction: Instruction) {
    try {
      const id = await API.postInstruction(userId, currentBookId, instruction);
      return id;
    } catch (error: any) {
      errorHandling("InstructionsArea - addInstruction", error);
      throw error;
    }
  }

  /** Fetch instructions associated to Book */
  async function fetchBookInstructions() {
    const res = await API.getBookInstructions(userId, currentBookId);
    setInstructions(res.instructions);
  }

  /** Fetch instructions associated to User */
  async function fetchUserInstructions() {
    const res = await API.getUserInstructions(userId);
    setInstructions(res);
  }

  /** Automatically associates "global user" instructions to current book on select */
  async function associateInstructionToBook(
    userId: number,
    currentBookId: number,
    instructionId: number,
  ) {
    try {
      const res = await API.postInstructionAssociation(
        userId,
        currentBookId,
        instructionId,
      );
    } catch (error: any) {
      errorHandling("InstructionsArea - associateInstructionToBook", error);
      throw error;
    }
  }

  const instructionRequestAction = {
    post: addInstruction,
    associate: associateInstructionToBook,
    addCreated: updateAvailableInstructions,
  };

  const instructionRequestAPI = {
    instructions,
    selected: whichInstructions,
    references: instructionsReferences,
  };
  /** Populate instruction area on mount */
  useEffect(() => {
    whichInstructions == "book"
      ? fetchBookInstructions()
      : fetchUserInstructions();
  }, [whichInstructions]);

  return (
    <Field className="h-full pb-5">
      <div className="grid grid-cols-2 gap-4">
        <FormLabel label={"Instructions:"} />
        <div className="flex justify-end">
          <div className="pr-4"> 
            <RadioSwitch
              handleSwitch={handleRadio}
              selection={whichInstructions}
              labelOne={"User"}
              labelTwo={"Book"}
              valueOne={"user"}
              valueTwo={"book"}
            />
          </div>
          <FontAwesomeIcon icon={faCircleInfo} />
        </div>
      </div>
      <InstructionsArea
        onInstructionInput={onInstructionInput}
        onInstructionRequest={instructionRequestAction}
        instructionRequestAPI={instructionRequestAPI}
      />
    </Field>
  );
}

export default InstructionsRequests;
