import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";

const links = [
  { to: "/", text: "Home" },
  { to: "/myclasses", text: "Classes" },
];

export default function NavBar() {
  const [showUserDropDown, setShowUserDropDown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation().pathname;
  const authData = useAuth();
  const userDropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropDownRef.current && !userDropDownRef.current.contains(event.target as Node)) {
        setShowUserDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="border-2 border-solid border-gray-200 bg-white">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-gray-50">
            R
          </div>
          <div className="ml-2 space-y-0.5">
            <h1 className="text-lg font-bold tracking-tighter">Rizzlet™</h1>
            <p className="text-xs text-gray-500">Interactive Flashcards</p>
          </div>
        </div>
        <div className="relative flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          {authData?.isLoggedIn ? (
            <button
              type="button"
              className="flex rounded-full bg-gray-800 text-sm hover:ring-4 hover:ring-gray-300 md:me-0"
              onClick={() => setShowUserDropDown(!showUserDropDown)}
            >
              <span className="sr-only">Open user menu</span>
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-gray-50"
                style={{ backgroundColor: authData.profileColor }}
              >
                {authData.authUserFullName[0]}
              </div>
            </button>
          ) : (
            <NavLink
              to="/login"
              className="rounded-md bg-gray-800 p-2 text-sm text-white hover:outline-none hover:ring-4 hover:ring-gray-200 md:me-0"
            >
              Log in
            </NavLink>
          )}

          <UserDropDown
            showUserDropDown={showUserDropDown}
            setShowUserDropDown={setShowUserDropDown}
            ref={userDropDownRef}
          />
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
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
          className="w-full items-center justify-between md:order-1 md:flex md:w-auto"
          hidden={!showMenu}
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={
                    "block rounded px-3 py-2 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 " +
                    (location === link.to ? "text-blue-700" : "text-gray-900")
                  }
                  aria-current="page"
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

interface UserDropDownProps {
  showUserDropDown: boolean;
  setShowUserDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  ref: React.RefObject<HTMLDivElement>;
}

const UserDropDown = React.forwardRef<HTMLDivElement, UserDropDownProps>(
  ({ showUserDropDown, setShowUserDropDown }, ref) => {
    const authData = useAuth();
    const navigate = useNavigate();

    return (
      <div
        ref={ref}
        className="absolute right-0 mt-2 w-32 top-full z-50 rounded-md bg-white shadow-md"
        hidden={!showUserDropDown}
        id="user-dropdown"
      >
        <div className="px-4 py-3">
          <span className="block whitespace-nowrap text-sm text-gray-600">
            {authData.authUserFullName}
          </span>

          <ul className="py-2" aria-labelledby="user-menu-button">
            <hr></hr>
            <li>
              <button
                className="block whitespace-nowrap pt-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  // redirects to profile page
                  navigate("/profilePage");
                  setShowUserDropDown(false);
                }}
              >
                Profile
              </button>
            </li>
          </ul>
          <span className="block whitespace-nowrap text-sm text-gray-600">
            Streak: {authData.streak}
          </span>
        </div>
        <hr></hr>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <button
              className="block whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                // Clear token in storage
                authData.setIsLoggedIn(false);
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    );
  }
);

UserDropDown.displayName = "UserDropDown";
