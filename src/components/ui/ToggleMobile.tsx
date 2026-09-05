import ToggleSwitch from "./common/ToggleSwitch";
import { TextAlignJustify } from "lucide-react";
import { SquareDashedText } from "lucide-react";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

/** Renders toggle switch the changes view from recipe list to recipe on mobile
 * 
 * TopNav -> ToggleMobile -> ToggleSwitch
 */
function ToggleMobile() {
    const { togglePage, isList } = useContext(UserContext);
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
