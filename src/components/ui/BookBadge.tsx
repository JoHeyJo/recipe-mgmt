import { UserAvatarProp } from "../../utils/props";
import AvatarFrame from "./common/AvatarFrame";

/** Displays User initials as a badge
 *
 * TextInputTitle -> BookBadge -> AvatarFrame
 */
function BookBadge({ title }: UserAvatarProp) {
  let firstInitial = "";
  let secondInitial = "";
  let initials = `${firstInitial}${secondInitial}`;

  if (title.includes(" ")) {
    const words = title.split(" ");
    firstInitial = words[0][0] || "";
    secondInitial = words[1][0] || "";
    initials = `${firstInitial}${secondInitial}`;
  } else {
    firstInitial = title[0] || "";
    secondInitial = title[1] || "";
    initials = `${title[0] || ""}${title[1] || ""}`;
  }

  return <AvatarFrame avatar={initials} />;
}

export default BookBadge;
