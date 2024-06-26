import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../features/userSlice";
import { BsHouseDoor, BsPeople } from "react-icons/bs";
import { IoMdSchool } from "react-icons/io";
import { FaWallet } from "react-icons/fa";

import {
  HiOutlineDocumentReport,
  HiOutlineClipboardList,
} from "react-icons/hi";
import { MdOutlineLegendToggle } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";

function TutorSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(clearUser());
    navigate("/login");
  };

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <div className="1/5">
          <aside
            id="default-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <div className="flex justify-end ">
                <p
                  className="text-white hover:bg-gray-200 hover:text-black font-bold text-xl p-2 rounded-full cursor-pointer"
                  onClick={toggleSidebar}
                >
                  X
                </p>
              </div>
              <div className="text-2xl  text-indigo-600 font-bold my-10">
                Welcome {}
              </div>
              <ul className="space-y-6 font-medium">
                <li>
                  <Link
                    to="/tutor/home/"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-stone-500 group bg-gray-700"
                  >
                    <BsHouseDoor
                      size={30}
                      className="inline mr-2 ml-4 hover:text-blue-800"
                    />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tutor/wallet/"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-stone-500 group bg-gray-700"
                  >
                    <FaWallet
                      size={28}
                      className="inline mr-2 ml-4 hover:text-blue-800"
                    />
                    Wallet
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tutor/profile/"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-stone-500 group   bg-gray-700"
                  >
                    <BsPeople
                      size={30}
                      className="inline mr-2 ml-4 hover:text-blue-800"
                    />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tutor/chat/"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-stone-500 group  bg-gray-700"
                  >
                    <HiOutlineDocumentReport
                      size={30}
                      className="inline mr-2 ml-4 hover:text-blue-800"
                    />
                    Messages
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tutor/createslot/"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-stone-500 group  bg-gray-700"
                  >
                    <IoMdSchool
                      size={30}
                      className="inline mr-2 ml-4 hover:text-blue-800"
                    />
                    Time slots
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tutor/viewslot/"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-stone-500 group  bg-gray-700"
                  >
                    <HiOutlineDocumentReport
                      size={30}
                      className="inline mr-2 ml-4 hover:text-blue-800"
                    />
                    View slots
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tutor/viewbookings/"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-stone-500 group  bg-gray-700"
                  >
                    <HiOutlineClipboardList
                      size={30}
                      className="inline mr-2 ml-4 hover:text-blue-800"
                    />
                    View bookings
                  </Link>
                </li>
                <li>
                  <button
                    className="flex items-center justify-center w-full my-20 p-3 text-gray-900 bg-red-500 rounded-lg dark:text-white hover:bg-red-600"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      ) : (
        <div className="flex justify-start items-start w-fit">
          <button className="bg-white text-black mt-10" onClick={toggleSidebar}>
            <MdOutlineLegendToggle
              size={40}
              color="white"
              className="bg-indigo-700"
            />
          </button>
        </div>
      )}
    </>
  );
}

export default TutorSidebar;
