```jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const LandingNav = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-background border-b border-primary">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        <Link
          to="/"
          className="flex items-center space-x-3"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Swift Logo"
          />

          <span className="self-center text-2xl font-semibold text-white">
            Swift-Chat
          </span>
        </Link>

        <div className="flex gap-4 items-center">
          <Link
            to={isAuthenticated ? "/chathome" : "/login"}
            className="text-white hover:text-primarySecond transition"
          >
            {isAuthenticated ? "Home" : "Login"}
          </Link>

          <Link
            to="/register"
            className="text-white hover:text-primarySecond transition"
          >
            Register
          </Link>

          <Link
            to="/contact"
            className="text-white hover:text-primarySecond transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
```
