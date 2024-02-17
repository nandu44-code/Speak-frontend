import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate=useNavigate()

    const handleClickSignUp = () => {
        navigate('/register/');
      };
    
    const handleClickLogIn = () => {
      navigate('/login/')
    };

  return (
    <nav className="bg-slate-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="#" className="text-white font-normal text-4xl ml-8">
            Speak
          </a>
        </div>

        {/* Navigation links */}
        <div className="hidden md:flex space-x-10">
          <a href="#" className="text-white  hover:text-gray-300 border-b-red-700">
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            About
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Services
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Contact
          </a>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none" onClick={handleClickSignUp}>
            Sign Up
          </button>
          <button className="bg-white-700 hover:bg-gray-800 text-red-500 font-normal py-2 px-4 rounded focus:outline-none" onClick={handleClickLogIn}>
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
