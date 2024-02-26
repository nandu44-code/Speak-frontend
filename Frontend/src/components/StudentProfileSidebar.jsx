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
          <Link to="/dashboard" className="block py-2 hover:bg-gray-200" onClick={toggleSidebar}>
            <BsHouseDoor size={20} className="inline mr-2 hover:text-blue-800" />
            Dashboard
          </Link>
        </li>
        <li className="hover:scale-110 mb-4">
          <Link to="/users" className="block py-2 hover:bg-gray-200" onClick={toggleSidebar}>
            <BsPeople size={20} className="inline mr-2 hover:text-blue-800" />
            Users
          </Link>
        </li>
        <li className="hover:scale-110 mb-4">
          <Link to="/tutors" className="block py-2 hover:bg-gray-200" onClick={toggleSidebar}>
            <IoMdSchool size={20} className="inline mr-2 hover:text-blue-800" />
            Tutors
          </Link>
        </li>
        <li className="hover:scale-110 mb-4">
          <Link to="/requests" className="block py-2 hover:bg-gray-200" onClick={toggleSidebar}>
            <HiOutlineDocumentReport size={20} className="inline mr-2 hover:text-blue-800" />
            Requests
          </Link>
        </li>
        <li className="hover:scale-110 mb-4">
          <Link to="/reports" className="block py-2 hover:bg-gray-200" onClick={toggleSidebar}>
            <HiOutlineClipboardList size={20} className="inline mr-2 hover:text-blue-800" />
            Reports
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
