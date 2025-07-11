import { useState, useEffect, useContext } from "react";
import { Instruction, Instructions } from "../../utils/types";
import InstructionManager from "../views/InstructionManager";
import { InstructionsAreaProps } from "../../utils/props";
import { UserContext } from "../../context/UserContext";
import { PLACE_HOLDER } from "../../utils/templates";
import { RecipeContext } from "../../context/RecipeContext";

/** Triggers creation of input if there are no inputs left (num of inputs = array index)
 * This doesn't work with refactoring of PLACE_HOLDER instructions
 */
const HAS_NO_REMAINING_INPUT = (inputs: number, arrayKey: number) =>
  inputs - 1 === arrayKey;

/** InstructionsArea handles selected instruction - updates GrandParent recipe state
 *
 * Dynamically renders list of instructions - filters out selected options (WIP)
 *
 * InstructionsRequests -> InstructionsArea -> InstructionManager
 */
function InstructionsArea({
  handleRecipeUpdate,
  data,
  handleInstruction,
}: InstructionsAreaProps) {
  const { userId, currentBookId } = useContext(UserContext);
  const { requestAction, contextInstructions } = useContext(RecipeContext);
  const [selectedInstructions, setSelectedInstructions] =
    useState<Instructions>(
      requestAction === "edit"
        ? [
            ...contextInstructions,
            { id: null, instruction: "some instruction..." },
          ]
        : PLACE_HOLDER,
    );
  const [filterKey, setFilterKeys] = useState({});

  /** Create additional input field for new instruction */
  function createInstructionInput() {
    setSelectedInstructions((selected) => [
      ...selected,
      { id: null, instruction: "some instruction..." },
    ]);
  }

  /** Update list of selected instructions */
  async function updateSelected(instruction: Instruction, arrayKey: number) {
    setSelectedInstructions((i: Instruction[]) => {
      const updatedInstructions = [...i];
      updatedInstructions[arrayKey] = instruction;
      return updatedInstructions;
    });

    if (data.selected === "user")
      handleInstruction.associate(userId, currentBookId, +instruction.id);

    if (HAS_NO_REMAINING_INPUT(selectedInstructions.length, arrayKey))
      createInstructionInput();
  }

  /** Remove unselected instruction */
  function removeSelected(instructionKey: number) {
    setSelectedInstructions((instructions) => {
      const alteredInstructions = [...instructions];
      alteredInstructions[instructionKey] = PLACE_HOLDER[instructionKey] || {
        id: null,
        instruction: "some instruction...",
      };
      return alteredInstructions;
    });
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

  /** Consolidates logic pertaining to adding instructions */
  const handleSelected = {
    // addInstruction,
    // addCreated,
    createInput: createInstructionInput,
    updateSelected,
    // updateFilterKeys,
    removeSelected,
    // removeFilterKey
  };

  /** Updates parent state of instructions when instructions is changed and on mount */
  useEffect(() => {
    handleRecipeUpdate(
      selectedInstructions.filter((i) => i.id),
      "instructions",
    );
  }, [selectedInstructions]);

  return (
    <div
      id="InstructionsArea"
      className="flex-col h-48 block w-full rounded-md border-2 border-accent-secondary pb-2 px-2 shadow-sm sm:leading-6"
    >
      {selectedInstructions.map((value, index) => (
        <InstructionManager
          key={index}
          arrayKey={index}
          instruction={value}
          options={data.instructions}
          handleSelected={handleSelected}
          handleInstruction={handleInstruction}
        />
      ))}
    </div>
  );
}

export default InstructionsArea;
