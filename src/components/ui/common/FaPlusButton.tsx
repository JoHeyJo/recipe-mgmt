import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FaPlusButtonProp } from "../../../utils/props";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";

function FaPlusButton({ onAction }: FaPlusButtonProp) {
  const { defaultBookId } = useContext(UserContext);
  const isDisabled = !!defaultBookId === false ? true : false;
  return (
    <button
      disabled={isDisabled}
      onClick={onAction}
      className={`font-semibold leading-7 ml-1 ${isDisabled ? "text-gray-400" : "hover:text-gray-400"} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-zinc-600`}
    >
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}

export default FaPlusButton;
