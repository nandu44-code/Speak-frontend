import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { getMyProfile, clearUser } from "../features/userSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const is_authenticated = useSelector((state) => state.user.is_authenticated);
  const [is_authenticated,setIs_authenticated] = useState(false)
  const [is_tutor, setIs_tutor] = useState(false);
  const [is_rejected, setIs_rejected] = useState(false)
  const [is_student,setIs_student] = useState(false)
  

  const handleClickSignUp = () => {
    navigate("/register/");
  };

  const handleClickLogIn = () => {
    navigate("/login/");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    dispatch(clearUser());
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const decodedToken = jwtDecode(token);
      const is_tutor = decodedToken.is_tutor;
      const is_rejected = decodedToken.is_rejected
      const is_student = decodedToken.is_student
      setIs_authenticated(true)
      setIs_tutor(is_tutor);
      setIs_rejected(is_rejected)
      setIs_student(is_student)
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-neutral-200 hover:border-b-1 mx-5 hover:duration-1000 border-indigo-900 border-transparent p-4 bg-fixed z-10 rounded-full shadow-md shadow-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-purple-900 font-bold text-4xl ml-0 hover:scale-x-110 hover:text-indigo-900"
          >
            Speak
          </Link>
        </div>

        {is_student? 
        <div className="flex">
          <div className="hidden md:flex space-x-10  mx-6">
           
            <Link
              to="/"
              className="text-purple-950 font-bold text-lg hover:scale-110  hover:text-indigo-900 duration-500"
            >
              Home
            </Link>
          </div>
          <div className="hidden md:flex space-x-10  mx-6">
        <Link
              to="/student/findTutors/"
              className="text-purple-950 font-bold text-lg hover:scale-110  hover:text-indigo-900 duration-500"
            >
              Find Tutor
            </Link>
            
           
          </div>
        </div>
        :
            null}

        {is_authenticated  ? (
          <>
            {is_tutor ? (
              is_rejected?(<Link to="/tutor/rejected">
              <FaUser
                size={24}
                className="cursor-pointer text-purple-950  hover:scale-110  hover:text-indigo-900 duration-500"
              />
            </Link>):(
              <Link to="/tutor/checklist">
              <FaUser
                size={24}
                className="cursor-pointer text-purple-950  hover:scale-110  hover:text-indigo-900 duration-500"
              />
            </Link>)
              
            ) : (
              <Link to="/student/profile/">
                <FaUser
                  size={24}
                  className="cursor-pointer text-purple-950  hover:scale-110  hover:text-indigo-900 duration-500"
                />
              </Link>
            )}

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
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group  group-hover:from-purple-600 ghover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              onClick={handleClickSignUp}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-500 bg-white dark:bg-indigo-900 rounded-md group-hover:bg-opacity-80">
                Sign Up
              </span>
            </button>
            <button
              className="bg-white-700 hover:bg-opacity-80 bg-stone-700 duration-700 text-white font-medium py-2 px-4 rounded focus:outline-none"
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
