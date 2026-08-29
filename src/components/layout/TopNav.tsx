import { useContext, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import ToggleColorScheme from "../../utils/ToggleColorScheme";
import UserAvatar from "../ui/UserAvatar";
import CreateBookRequests from "../requests/CreateBookRequests";
import Invite from "../requests/Invite";
import ToggleMobile from "../ui/ToggleMobile";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type TopNavProps = { logout: () => void };

/**
 *
 * App -> TopNav -> [CreateBookRequests, Invite]
 */
function TopNav({ logout }: TopNavProps) {
  const [isCreateBookOpen, setIsCreateBookOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const { user, userId } = useContext(UserContext);
  const navigate = useNavigate();

  function handleCloseInvite() {
    setIsInviteOpen(false);
  }

  function handleOpenInvite() {
    setIsInviteOpen(true);
  }

  function handleModale() {
    setIsCreateBookOpen(false);
  }

  function logOutAndRedirect() {
    logout();
    navigate("/");
  }
  return (
    <>
      <CreateBookRequests
        isOpen={isCreateBookOpen}
        onCloseDialog={handleModale}
      />
      <Invite
        isDialogOpen={isInviteOpen}
        onCloseDialogPanel={handleCloseInvite}
      />
      <section
        id="TopNav-Backdrop"
        className="flex mx-auto justify-center bg-secondary px-2 sm:px-6 lg:px-8"
      >
        <section
          id="TopNav-Bar"
          className="flex flex-1 items-center max-w-7xl py-3 sm:px-6 sm:pr-0 lg:px-8 bg-secondary"
        >
          <button
            id="TopNav-toggle-mobile-view"
            className="bg-transparent md:hidden"
          >
            <ToggleMobile />
          </button>

          <div id="TopNav-Icon-Dropdown" className="flex ml-auto pr-12">
            <ToggleColorScheme />
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  {/* <span className="sr-only">Open user menu</span> */}
                  {user && <UserAvatar title={user} />}
                  {/* User will eventually be able to upload image */}
                  {/* <img
                          className="h-8 w-8 rounded-full"
                          // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          src={Eli}
                          alt=""
                        /> */}
                </MenuButton>
              </div>

              <MenuItems
                id="TopNav-Items"
                className="absolute right-0 z-10 mt-2 w-48 bg-primary origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {user ? (
                  <>
                    <MenuItem>
                      <a
                        href="#"
                        className="TopNav-Item block px-4 py-2 text-sm bg-primary"
                      >
                        Your Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => setIsCreateBookOpen(true)}
                        className="TopNav-Item block px-4 py-2 text-sm bg-primary"
                      >
                        Create Book
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="TopNav-Item block px-4 py-2 text-sm bg-primary"
                      >
                        Settings
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        onClick={logOutAndRedirect}
                        className="TopNav-Item block px-4 py-2 text-sm bg-primary"
                      >
                        Logout
                      </a>
                    </MenuItem>
                    {userId === 1 && (
                      <MenuItem>
                        <button
                          onClick={handleOpenInvite}
                          className="TopNav-Item block px-4 py-2 text-sm bg-primary"
                        >
                          Invite
                        </button>
                      </MenuItem>
                    )}
                  </>
                ) : (
                  <MenuItem>
                    <a
                      href="#"
                      onClick={() => navigate("/")}
                      className="TopNav-Item block px-4 py-2 text-sm bg-primary"
                    >
                      Login
                    </a>
                  </MenuItem>
                )}
              </MenuItems>
            </Menu>
          </div>
        </section>
      </section>
    </>
  );
}

export default TopNav;
