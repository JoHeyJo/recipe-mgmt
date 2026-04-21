import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Controls(role: string, type: string) {

  const fullPrivileges = role === "owner" && type === "standard"
  const collaborator = role === "collaborator" && type === "standard"
  const sharedInbox = role === "owner" && type === "shared_inbox"
  const viewOnly = role === "viewer" && type === "standard"

  const renderControls = {
    
  }
  return (
    <section>
      {role === "owner" && <FontAwesomeIcon icon={faPenToSquare} />}
    </section>
  );
}

export default Controls;
