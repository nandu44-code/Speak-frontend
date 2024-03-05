import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { getMyProfile,clearUser } from "../features/userSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userState = useSelector(state => state.user)
  const [isAuthenticated, setIsauthenticated] = useState("");
  const handleClickSignUp = () => {
    navigate("/register/");
  };

  const handleClickLogIn = () => {
    navigate("/login/");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    dispatch((clearUser()))
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const decodedToken = jwtDecode(token);
      setIsauthenticated("true"); // Assuming roles are stored in the 'roles' field
    }
  }, []);

  return (
    <nav className="bg-slate-700 p-4 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to='/' className="text-white font-normal text-4xl ml-0">
            Speak
          </Link>
        </div>

        {/* Navigation links */}
        <div className="hidden md:flex space-x-10  hover:border-b-4 border-indigo-400 ">
          <Link to="/" className="text-white  hover:text-gray-200">
            Home
          </Link>
        </div>

        {isAuthenticated ? (
          <>
            <Link to="/student/profile/">
              <FaUser
                size={24}
                className="cursor-pointer text-white  transform hover:-scale-x-110 transition-transform hover: from-purple-600 to-blue-500"
              />
            </Link>
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              onClick={handleLogout}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-500 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Logout
              </span>
            </button>
          </>
        ) : (
          <div>
          <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={handleClickSignUp}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-500 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Sign Up
          </span>
        </button>
            <button
              className="bg-white-700 hover:bg-gray-800 text-red-500 font-medium py-2 px-4 rounded focus:outline-none"
              onClick={handleClickLogIn}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
