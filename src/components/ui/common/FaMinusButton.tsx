import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FaMinusButtonProp } from "../../../utils/props";

function FaMinusButton({ onAction }: FaMinusButtonProp) {
  const handleClick = () => {
    onAction();
  };
  return (
    <button
      onClick={handleClick}
      className="font-semibold leading-7 ml-1 text-gray-900 hover:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-zinc-600"
    >
      <FontAwesomeIcon icon={faMinus} />
    </button>
  );
}

export default FaMinusButton;
