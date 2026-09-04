import { useState, useContext, useEffect, ChangeEvent } from "react";
import { UserContext } from "../../context/UserContext";
import { Instruction, Instructions } from "../../utils/types";
import API from "../../api";
import { errorHandling } from "../../utils/ErrorHandling";
import InstructionsArea from "../ui/InstructionsArea";
import { InstructionsRequestsProp } from "../../utils/props";
import FormLabel from "../ui/common/Label";
import { Field } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../ui/common/Tooltip";
import ToggleSource from "../ui/ToggleSource";
import { BookOpen, User } from "lucide-react";
import { DataContext } from "../../context/DataContext";

/** Handles API requests & instructionRequestAPI management for Instructions
 *
 * RecipeForm -> InstructionsRequests -> InstructionsArea
 */
function InstructionsRequests({
  onInstructionInput,
}: InstructionsRequestsProp) {

  const { userId, currentBookId } = useContext(UserContext);
  const { setInstructions } = useContext(DataContext);

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

  return (
    <Field className="flex min-h-0 flex-col min-h-0 flex-1">
      <div className="grid grid-cols-2 gap-4">
        <FormLabel label={"Instructions:"} />
        <div className="flex justify-end">
          <div className="pr-4">
            <ToggleSource />
          </div>
          <Tooltip
            multiline
            maxWidth={200}
            content={
              <>
                Toggle to view in dropdown <br />
                <User className="inline h-4 w-4 shrink-0" /> User = all recorded
                information <br />
                <BookOpen className="inline h-4 w-4 shrink-0" /> Book =
                information corresponding to selected book
              </>
            }
          >
            <FontAwesomeIcon icon={faCircleInfo} />
          </Tooltip>
        </div>
      </div>
      <InstructionsArea
        onInstructionInput={onInstructionInput}
        onInstructionRequest={instructionRequestAction}
      />
    </Field>
  );
}

export default InstructionsRequests;
