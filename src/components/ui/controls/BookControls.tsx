import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faEye, faInbox } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../common/Tooltip";
import FaShareButton from "../common/FaShareButton";
import FaPlusButton from "../common/FaPlusButton";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

type BookControlsProps = {
  shareControl: () => void;
  addControl: () => void;
  children: ReactNode;
  render: boolean;
};
/** Dynamically renders UI to grant/prevent sharing a book and adding a recipe
 * Owner        role = owner, type = standard
 * Collaborator role = collaborator, type = standard
 * Shared       role = owner, type = shared_inbox
 * viewer       role = viewer, type standard
 * Share_book(copy/remove controls NO edit)
 * MainContainer -> BookControls -> Tooltip
 */
function BookControls({
  children,
  render,
  shareControl,
  addControl,
}: BookControlsProps) {
  const { privileges } = useContext(UserContext);

  const shareControls = {
    share: <FaShareButton handleClick={shareControl} />,
    blockShare: (
      <Tooltip content="Only book owner can share" side="top">
        <FontAwesomeIcon icon={faUsers} />
      </Tooltip>
    ),
    sharedRecipes: (
      <Tooltip content="Shared recipes can only be viewed" side="top">
        <FontAwesomeIcon icon={faInbox} />
      </Tooltip>
    ),
    viewOnly: (
      <Tooltip content="Recipes can only be viewed" side="top">
        <FontAwesomeIcon icon={faEye} />
      </Tooltip>
    ),
  };

  const addControls = {
    addRecipe: <FaPlusButton onAction={addControl} />,
  };

  function chooseShareControl() {
    if (privileges.full) return shareControls.share;
    if (privileges.collaborator) return shareControls.blockShare;
    if (privileges.sharedInbox) return shareControls.sharedRecipes;
    if (privileges.viewer) return shareControls.viewOnly;
  }

  function chooseAddControl() {
    if (privileges.full || privileges.collaborator)
      return addControls.addRecipe;
    if (privileges.sharedInbox || privileges.viewer) return;
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
