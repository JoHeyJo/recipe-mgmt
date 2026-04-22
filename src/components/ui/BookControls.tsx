import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../ui/common/Tooltip";
import FaShareButton from "../ui/common/FaShareButton";
import FaPlusButton from "../ui/common/FaPlusButton";

type BookControlsProps = {
  role: string;
  type: string;
  shareControl: () => void;
  addControl: () => void;
  children: ReactNode;
  render: boolean;
};
/** Dynamically renders UI for share book and add recipe
 * Owner        role = owner, type = standard
 * Collaborator role = collaborator, type = standard
 * Shared       role = owner, type = shared_inbox
 * viewer       role = viewer, type standard
 * Share_book(copy/remove controls NO edit)
 */
function BookControls({
  role,
  type,
  children,
  render,
  shareControl,
  addControl,
}: BookControlsProps) {
  const fullPrivileges = role === "owner" && type === "standard";
  const collaborator = role === "collaborator" && type === "standard";
  const sharedInbox = role === "owner" && type === "shared_inbox";
  const viewOnly = role === "viewer" && type === "standard";

  const renderShareControl = {
    share: <FaShareButton handleClick={shareControl} />,
    blockShare: (
      <Tooltip content="Only book owner can share" side="top">
        <FontAwesomeIcon icon={faUsers} />
      </Tooltip>
    ),
  };

  const renderAddControl = {
    addRecipe: <FaPlusButton onAction={addControl} />,
  };

  function chooseShareControl() {
    if (fullPrivileges) return renderShareControl.share;
    if (collaborator || sharedInbox || viewOnly)
      return renderShareControl.blockShare;
  }

  function chooseAddControl() {
    if (fullPrivileges || collaborator) return renderAddControl.addRecipe;
    if (sharedInbox || viewOnly) return;
  }

  return (
    <section className="flex flex-1">
      {render && (
        <section className="flex [flex: 0.5] justify-center">
          {chooseShareControl()}
        </section>
      )}
      {render && (
        <section className="flex flex-1 justify-center">{children}</section>
      )}
      {render && (
        <section className="flex [flex: 0.5] justify-center">
          {chooseAddControl()}
        </section>
      )}
    </section>
  );
}
export default BookControls;
