import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type RecipeControlsProps = {
  role: string;
  type: string;
  action: () => void;
};

/** Dynamically renders UI for edit recipe
 * Owner        role = owner, type = standard
 * Collaborator role = collaborator, type = standard
 * Shared       role = owner, type = shared_inbox
 * viewer       role = viewer, type standard
 * Share_book(copy/remove controls NO edit)
 * 
 * RecipeContainer -> RecipeControls
 */
function RecipeControls({ role, type, action }: RecipeControlsProps) {
  const fullPrivileges = role === "owner" && type === "standard";
  const collaborator = role === "collaborator" && type === "standard";
  const sharedInbox = role === "owner" && type === "shared_inbox";
  const viewer = role === "viewer" && type === "standard";

  const renderControl = {
    editControls: (
      <button
        onClick={action}
        className="font-semibold leading-7 ml-1 hover:text-text-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-zinc-600"
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    )
  };

  function chooseControls(){
    if(fullPrivileges || collaborator) return renderControl.editControls;
    if (sharedInbox || viewer) return; 
  }

  return (
    <section>
      {chooseControls()}
    </section>
  );
}

export default RecipeControls;
