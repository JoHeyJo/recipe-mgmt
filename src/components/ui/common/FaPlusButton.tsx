import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FaPlusButtonProp } from "../../../utils/props";

function FaPlusButton({ onAction }: FaPlusButtonProp) {
  return (
    <button
      onClick={onAction}
      className="font-semibold leading-7 ml-1 hover:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-zinc-600"
    >
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}

export default FaPlusButton;
