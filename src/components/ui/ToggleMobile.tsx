import ToggleSwitch from "./common/ToggleSwitch";
import { TextAlignJustify } from "lucide-react";
import { SquareDashedText } from "lucide-react";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

/** Renders toggle switch the changes view from reipce list to recipe on mobile
 * 
 * TopNav -> ToggleMobile -> ToggleSwitch
 */
function ToggleMobile() {
    const { togglePage, isList } = useContext(UserContext);
    console.log("isLis:",isList)
  return (
    <ToggleSwitch
      iconOne={TextAlignJustify}
      iconTwo={SquareDashedText}
      onAction={togglePage}
      isDefault={isList}
    />
  );
}
export default ToggleMobile;
