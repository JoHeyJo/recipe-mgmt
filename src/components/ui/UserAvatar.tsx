import { BadgeProp } from "../../utils/props";
import AvatarFrame from "./common/AvatarFrame";

/** Displays User initials as a badge
 * 
 * [TopNav, TextInputTitle] -> UserAvatar
 */
function UserAvatar({user}: BadgeProp) {
  const initials = title[0] && title[1] && `${title[0]}${title[1]}`;
  return <AvatarFrame avatar={initials}/>
}

export default UserAvatar;