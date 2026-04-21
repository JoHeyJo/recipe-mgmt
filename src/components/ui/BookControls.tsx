import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../ui/common/Tooltip";
import FaShareButton from "../ui/common/FaShareButton";
import FaPlusButton from "../ui/common/FaPlusButton";

type BookControlsProps = {
  role: string;
  type: string;
  action: () => void;
  children?: ReactNode;
};
/**
 * 
      /* Render edit button:
                Owner        role = owner, type = standard
                Collaborator role = collaborator, type = standard
                Shared       role = owner, type = shared_inbox
                viewer       role = viewer, type standard
                Share_book(copy/remove controls NO edit) 
 */
function BookControls({ role, type, action }: BookControlsProps) {
  const fullPrivileges = role === "owner" && type === "standard";
  const collaborator = role === "collaborator" && type === "standard";
  const sharedInbox = role === "owner" && type === "shared_inbox";
  const viewOnly = role === "viewer" && type === "standard";

  const renderControl = {
    share: <FaShareButton handleClick={action} />,
    blockShare: (
      <Tooltip content="Only book owner can share" side="top">
        <FontAwesomeIcon icon={faUsers} />
      </Tooltip>
    ),
    addRecipe: (
      <section className="flex [flex:0.5] justify-center">
        <FaPlusButton onAction={action} />
      </section>
    ),
  };

  function chooseControl(){
    if(fullPrivileges) return renderControl.share
    if(collaborator || sharedInbox || viewOnly) return renderControl.blockShare
  }


  return (
    <section>
      {chooseControl()}
    </section>
  );
}
export default BookControls;
