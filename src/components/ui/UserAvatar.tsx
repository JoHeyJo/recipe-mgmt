import { UserAvatarProp } from "../../utils/props";
import AvatarFrame from "./common/AvatarFrame";

/** Displays User initials or image as Avatar
 *   
 * TopNav -> UserAvatar -> AvatarFrame
 */
function UserAvatar({ title }: UserAvatarProp) {
  const initials = (title[0] && title[1]) ? `${title[0]}${title[1]}` : `${title[0]}`;
  return <AvatarFrame avatar={initials} />;
}

export default UserAvatar;