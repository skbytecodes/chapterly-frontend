import { Menu, Transition } from "@headlessui/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDownMenu() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <AccountCircleIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/myaccount"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Your Account
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/personalSetting"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Personal Settings
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/myorders"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Your Orders
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/wishlist"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Your Wishlist
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/updateAddress"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Your Address
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/changePassword"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Change Password
                </Link>
              )}
            </Menu.Item>
          </div>

          <div className="py-1">
            {isLoggedIn ? (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/changePassword"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Logout
                  </Link>
                )}
              </Menu.Item>
            ) : (
              <></>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
