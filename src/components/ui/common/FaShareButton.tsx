import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";

/** Icon component that calls action to share a book with another user
 *
 * BookView -> FaShareButton
 */
function FaShareButton({ handleClick }) {
  return (
    <button onClick={() => handleClick()} type="button" className="px-2 ">
      <FontAwesomeIcon icon={faShareFromSquare} />
    </button>
  );
}

export default FaShareButton;
