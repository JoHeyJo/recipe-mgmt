import { BookOpen, User } from "lucide-react";
import ToggleSwitch from "./common/ToggleSwitch";
import { TextAlignJustify } from "lucide-react";
import { SquareDashedText } from "lucide-react";


function ToggleMobile({ onToggleView }) {
  return <ToggleSwitch iconOne={TextAlignJustify} iconTwo={SquareDashedText} onAction={onToggleView} />;
}
export default ToggleMobile;
