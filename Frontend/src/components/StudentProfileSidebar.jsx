import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsHouseDoor, BsPeople } from 'react-icons/bs';
import { IoMdSchool } from 'react-icons/io';
import { HiOutlineDocumentReport, HiOutlineClipboardList } from 'react-icons/hi';

const StudentProfileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`flex justify-items-end bg-stone-200 pt-10 mt-64 ml-40 text-indigo-900 font-semibold text-md h-1/2 w-1/6 p-4  ${isOpen ? 'md:block' : 'hidden md:block'} rounded-lg`}>
      <ul>
        <li className="hover:scale-110 mb-4">
          <Link to="/student/profile/" className="block py-2 bg-zinc-300 hover:bg-gray-200 rounded-lg" onClick={toggleSidebar}>
            <BsHouseDoor size={20} className="inline mr-2 hover:text-blue-800" />
           Basic Details
          </Link>
        </li>
        <li className="hover:scale-105 mb-4">
          <Link to="/student/changePassword/" className="block py-2 bg-zinc-300 hover:bg-gray-200 rounded-lg" onClick={toggleSidebar}>
            <HiOutlineClipboardList size={20} className="inline mr-2 hover:text-blue-800" />
            Change Password
          </Link>
        </li>
        <li className="hover:scale-110 mb-4">
          <Link to="/student/viewBookings/" className="block py-2 bg-zinc-300 hover:bg-gray-200 rounded-lg" onClick={toggleSidebar}>
            <HiOutlineClipboardList size={20} className="inline mr-2 hover:text-blue-800" />
            View Bookings
          </Link>
        </li>
      </ul>
      <div className="md:hidden">
        <button onClick={toggleSidebar}>Toggle Sidebar</button>
      </div>
    </nav>
  );
};

export default StudentProfileSidebar;
