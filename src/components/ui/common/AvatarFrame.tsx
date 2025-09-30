import { AvatarFrameProp } from "../../../utils/props";

/** Displays User initials as a Avatar
 *
 * [TopNav, TextInputTitle] -> Avatar
 */
function AvatarFrame({ avatar }: AvatarFrameProp) {
  return (
    <div
      id="AvatarFrame"
      className="mx-auto bg-background-color flex h-12 w-12 items-center justify-center rounded-full"
    >
      {avatar}
    </div>
  );
}

export default AvatarFrame;
