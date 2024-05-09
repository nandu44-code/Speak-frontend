import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../features/userSlice";
import { BsHouseDoor, BsPeople } from "react-icons/bs";
import { IoMdSchool } from "react-icons/io";
import {
  HiOutlineDocumentReport,
  HiOutlineClipboardList,
} from "react-icons/hi";
import { RiLogoutBoxLine } from "react-icons/ri";

function TutorSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(clearUser());
    navigate("/login");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    // <div className='w-2/5'>
    <nav
      className={`text-indigo-800 font-bold h-screen border-l-8  border-r-2 shadow-xl shadow-black bg-gradient-to-b from-gray-300 to-stone-300 border-indigo-800 rounded-md w-1/5 p-4 m-4 ${
        isOpen ? "md:block" : "hidden md:block"
      }`}
    >
      <div className="">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-indigo-900 text-transparent bg-clip-text">
          Welcome Tutor
        </h2>
      </div>
      <hr className="my-2 bg-gray-900 "></hr>
      <ul className="mt-20">
        <li className="hover:scale-110 mb-4 bg-stone-100 rounded-md flex justify-start">
          <Link
            to="/tutor/home/"
            className="block py-2 text-lg hover:bg-gray-200"
            onClick={toggleSidebar}
          >
            <BsHouseDoor
              size={30}
              className="inline mr-2 ml-4 hover:text-blue-800"
            />
            Dashboard
          </Link>
        
        </li>
        <li className="hover:scale-110 mb-10 bg-stone-100 rounded-md  flex justify-start">
          <Link
            to="/tutor/profile/"
            className="block py-2 text-lg hover:bg-gray-200"
            onClick={""}
          >
            <BsPeople size={30} className="inline mr-2 ml-4 hover:text-blue-800" />
            Profile
            </Link>
        </li>
        <li className="hover:scale-110 mb-4  bg-stone-100 rounded-md flex justify-start">
          <Link
            to="/tutor/createslot/"
            className="block py-2 text-lg hover:bg-gray-200"
            onClick={""}
          >
            <BsPeople size={30} className="inline mr-2 hover:text-blue-800 ml-4" />
            Time Slots
          </Link>
        </li>
        <li className="hover:scale-110 mb-4  bg-stone-100 rounded-md flex justify-start">
          <Link
            to="/tutor/viewslot/"
            className="block py-2 text-lg hover:bg-gray-100"
            onClick={""}
          >
            <HiOutlineClipboardList
              size={30}
              className="inline mr-2 hover:text-blue-800 ml-4"
            />
            View Slots
          </Link>
        </li>
        <li className="hover:scale-110 mb-4  bg-stone-100 rounded-md flex justify-start">
          <Link
            to="/tutor/viewbookings/"
            className="block py-2 text-lg hover:bg-gray-200"
            onClick={""}
          >
            <HiOutlineClipboardList
              size={30}
              className="inline mr-2 hover:text-blue-800 ml-4"
            />
            View Bookings
          </Link>
        </li>
        <li
          className="hover:bg-red-600 duration-500 mb-4 cursor-pointer rounded-md bg-red-500 mt-10"
          onClick={handleLogout}
        >
          <p className="block py-2 text-white  font-normal">
            <RiLogoutBoxLine
              size={20}
              className="inline mr-2"
            />
            Log out
          </p>
        </li>
      </ul>
    </nav>
    // </div>
  );
}

export default TutorSidebar;
