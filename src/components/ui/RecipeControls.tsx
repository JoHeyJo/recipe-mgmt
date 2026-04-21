import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type RecipeControlsProps = {
  role: string;
  type: string;
  action: () => void;
};

/**
 Render edit button:
                Owner        role = owner, type = standard
                Collaborator role = collaborator, type = standard
                Shared       role = owner, type = shared_inbox
                viewer       role = viewer, type standard
                Share_book(copy/remove controls NO edit) 
*/
function RecipeControls({ role, type, action }: RecipeControlsProps) {
  const fullPrivileges = role === "owner" && type === "standard";
  const collaborator = role === "collaborator" && type === "standard";
  const sharedInbox = role === "owner" && type === "shared_inbox";
  const viewOnly = role === "viewer" && type === "standard";

  const renderControl = {
    fullPrivileges: (
      <button
        onClick={action}
        className="font-semibold leading-7 ml-1 hover:text-text-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-zinc-600"
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    ),
    // collaborator: (

    // ),

  };

  function chooseControls(){
    if(fullPrivileges) return renderControl.fullPrivileges;
    // if(collaborator) return renderControl.collaborator;
  }

  return (
    <section>
      {chooseControls()}
    </section>
  );
}

export default RecipeControls;
