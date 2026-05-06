import { faPenToSquare, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

type RecipeControlsProps = {
  action: () => void;
};

/** Dynamically renders UI to allow recipe edit or recipe copy based on PRIVILEGES
 * Owner        role = owner, type = standardS
 * Collaborator role = collaborator, type = standard
 * Shared       role = owner, type = shared_inbox
 * viewer       role = viewer, type standard
 * Share_book(copy/remove controls NO edit)
 *
 * RecipeContainer -> RecipeControls
 */
function RecipeControls({ action }: RecipeControlsProps) {
  const { PRIVILEGES } = useContext(UserContext);

  const renderControl = {
    editControls: (
      <button
        onClick={action}
        className="font-semibold leading-7 ml-1 hover:text-text-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-zinc-600"
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    ),
    sharedInboxControls: (
      <button
        onClick={action}
        className="font-semibold leading-7 ml-1 hover:text-text-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-zinc-600"
      >
        <FontAwesomeIcon icon={faCopy} />
      </button>
    ),
  };

  function chooseControls() {
    if (PRIVILEGES.full || PRIVILEGES.collaborator)
      return renderControl.editControls;
    if (PRIVILEGES.sharedInbox) return renderControl.sharedInboxControls;
    if (PRIVILEGES.viewer) return;
  }

  return <section>{chooseControls()}</section>;
}

export default RecipeControls;
