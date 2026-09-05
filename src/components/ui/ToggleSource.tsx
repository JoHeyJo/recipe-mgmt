import { BookOpen, User } from "lucide-react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import ToggleSwitch from "./common/ToggleSwitch";

/** Renders request button to fetch user/book data
 * InstructionsRequests -> ToggleSource -> ToggleSwitch
 */

function ToggleSource() {
  const { isBookSource, requestData, setIngredientOptions, setInstructions } =
    useContext(DataContext);

  async function handleToggle() {
    const data: any = await requestData(isBookSource);
    setInstructions(data.instructions);
    setIngredientOptions(data.ingredients);
  }

  return (
    <ToggleSwitch
      iconOne={BookOpen}
      iconTwo={User}
      onAction={handleToggle}
      isDefault={isBookSource}
    />
  );
}

export default ToggleSource;
