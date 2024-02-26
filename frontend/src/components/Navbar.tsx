import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
import axios from "axios";

const links = [
  { to: "/", text: "Home" },
  { to: "/login", text: "About" },
];

export default function NavBar() {
  const [showUserDropDown, setShowUserDropDown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const location = window.location.pathname;
  const authData = useAuth();

  return (
    <nav className="bg-white border-solid border-2 border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-900 text-gray-50">
            R
          </div>
          <div className="space-y-0.5 ml-2">
            <h1 className="text-lg font-bold tracking-tighter">Rizzlet</h1>
            <p className="text-xs text-gray-500 ">Interactive Flashcards</p>
          </div>
        </div>
        <div className="flex relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {authData?.isLoggedIn ? (
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 hover:ring-4 hover:ring-gray-300 "
              onClick={() => {
                setShowUserDropDown(!showUserDropDown);
              }}
            >
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-900 text-gray-50">
                {authData.authUserFullName[0]}
              </div>
            </button>
          ) : (
            <Link
              to="/login"
              className="text-sm bg-gray-800 text-white rounded-md md:me-0  hover:outline-none hover:ring-4 hover:ring-gray-200  p-2"
            >
              Log in
            </Link>
          )}

          <UserDropDown showUserDropDown={showUserDropDown} />
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between w-full md:flex md:w-auto md:order-1"
          hidden={!showMenu}
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={
                    "block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 " +
                    (location === link.to ? "text-blue-700" : "text-gray-900")
                  }
                  aria-current="page"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function UserDropDown(props: { showUserDropDown: boolean }) {
  const authData = useAuth();

  return (
    <div
      className="absolute top-full right-0 z-50 bg-white shadow-md"
      hidden={!props.showUserDropDown}
      id="user-dropdown"
    >
      <div className="px-4 py-3">
        <span className="block text-sm text-gray-600 whitespace-nowrap">
          {authData.authUserFullName}
        </span>
      </div>
      <hr></hr>
      <ul className="py-2" aria-labelledby="user-menu-button">
        <li>
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
            onClick={() =>
              // Clear cookies
              {
                // Clear cookie
                axios
                  .post(
                    new URL(
                      "/api/auth/logout",
                      process.env.REACT_APP_BACKEND_URL!
                    ).href,
                    {},
                    { withCredentials: true }
                  )
                  .then(() => {
                    window.location.href = "/";
                  })
                  .finally(() => {
                    authData.setIsLoggedIn(false);
                  });
              }
            }
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
}
