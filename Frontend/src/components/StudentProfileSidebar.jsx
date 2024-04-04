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
    <nav className={`bg-transparent text-indigo-800 font-bold h-screen w-1/5 p-4  ${isOpen ? 'md:block' : 'hidden md:block'}`}>
      <ul>
        <li className="hover:scale-110 mb-4">
          <Link to="/student/profile/" className="block py-2 hover:bg-gray-200" onClick={toggleSidebar}>
            <BsHouseDoor size={20} className="inline mr-2 hover:text-blue-800" />
           Your Profile
          </Link>
        </li>
        <li className="hover:scale-110 mb-4">
          <Link to="/student/changePassword/" className="block py-2 hover:bg-gray-200" onClick={toggleSidebar}>
            <HiOutlineClipboardList size={20} className="inline mr-2 hover:text-blue-800" />
            Change password
          </Link>
        </li>
        <li className="hover:scale-110 mb-4">
          <Link to="/student/viewBookings/" className="block py-2 hover:bg-gray-200" onClick={toggleSidebar}>
            <HiOutlineClipboardList size={20} className="inline mr-2 hover:text-blue-800" />
            View bookings
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
