import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";

const Nav = () => {
  const { logout, isAuthenticated } = useAuth();
  const [isMobile, setIsMobile] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <button
        onClick={() => setIsMobile(!isMobile)}
        className="fixed bottom-5 left-5 z-50 flex h-10 aspect-square items-center justify-center rounded-full bg-primary lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {isMobile && (
        <header className="fixed h-screen w-[150px] z-40 lg:static bg-background border-r border-gray-700">
          <Link
            to="/"
            className="flex gap-2 items-center justify-center border-b border-gray-700 py-4"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Swift Logo"
            />
            <span className="font-semibold text-xl">Swift</span>
          </Link>

          <nav className="h-full flex flex-col my-4 justify-between">
            <div className="flex flex-col gap-5 px-4">
              <Link to="/profile" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0ZM4.5 20.118a7.5 7.5 0 0115 0"
                  />
                </svg>
                <span>Profile</span>
              </Link>

              <Link to="/chathome" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 110-.75.375.375 0 010 .75Zm3.75 0a.375.375 0 110-.75.375.375 0 010 .75Zm3.75 0a.375.375 0 110-.75.375.375 0 010 .75Z"
                  />
                </svg>
                <span>Chats</span>
              </Link>
            </div>

            <div className="px-4 mb-14">
              <button
                onClick={logout}
                className="flex items-center gap-2 text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-3-3h9m0 0-3-3m3 3-3 3"
                  />
                </svg>
                Logout
              </button>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Nav;