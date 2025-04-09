import { Fragment, useContext, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Eli from "../../images/Eli.jpg";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import ToggleColorScheme from "../../utils/ToggleColorScheme";
import CreateBook from "../requests/CreateBook";

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

function TopNav({ logout }: TopNavProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  function logOutAndRedirect() {
    logout();
    navigate("/");
  }

  return (
    <>
      <CreateBook isOpen={isModalOpen} setOpen={setIsModalOpen} />
      <Disclosure as="nav" className="TopNav-Disclosure">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                {/* THIS DIV IS A PLACEHOLDER OTHERWISE DIV CONTAINER ON RIGHT SHIFTS LEFT */}
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  {/* Default nav options from TAILWIND includes logo and nav links */}
                  {/* KEEP FOR NOW TO POSSIBLY INTEGRATE WITH FUTURE USEFUL LINK */}
                  {/* <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div> */}
                  {/* <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div> */}
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* BELL ICON - NOTIFICATIONS MAYBE - MAYBE DELETE */}
                  {/* <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}

                  {/* Profile dropdown */}
                  <ToggleColorScheme />
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          src={Eli}
                          alt=""
                        />
                      </MenuButton>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems
                        id="TopNav-Items"
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        {user ? (
                          <>
                            <MenuItem>
                              <a
                                href="#"
                                className="TopNav-Item block px-4 py-2 text-sm data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-600"
                              >
                                Your Profile
                              </a>
                            </MenuItem>
                            <MenuItem>
                              <a
                                onClick={() => setIsModalOpen(true)}
                                href="#"
                                className="TopNav-Item block px-4 py-2 text-sm data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-600"
                              >
                                Create Book
                              </a>
                            </MenuItem>
                            <MenuItem>
                              <a
                                href="#"
                                className="TopNav-Item block px-4 py-2 text-sm data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-600"
                              >
                                Settings
                              </a>
                            </MenuItem>
                            <MenuItem>
                              <a
                                onClick={logOutAndRedirect}
                                href="#"
                                className="TopNav-Item block px-4 py-2 text-sm data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-600"
                              >
                                Logout
                              </a>
                            </MenuItem>
                          </>
                        ) : (
                          <MenuItem>
                            <a
                              href="#"
                              onClick={() => navigate("/")}
                              className="TopNav-Item block px-4 py-2 text-sm data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-600 "
                            >
                              Login
                            </a>
                          </MenuItem>
                        )}
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
            {/* MOBILE DROPDOWN */}
            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium",
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </>
  );
}

export default TopNav;
