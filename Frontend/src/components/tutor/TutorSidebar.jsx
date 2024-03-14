import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../features/userSlice';
import { BsHouseDoor, BsPeople } from 'react-icons/bs';
import { IoMdSchool } from 'react-icons/io';
import { HiOutlineDocumentReport, HiOutlineClipboardList } from 'react-icons/hi';

function TutorSidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch((clearUser()))
    navigate("/login");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
    <nav className={`bg-white shadow-2xl text-indigo-800 font-bold h-screen w-1/5 p-4  ${isOpen ? 'md:block' : 'hidden md:block'}`}>
       <div className="mb-8">
        <h2 className="text-3xl font-bold">Welcome Tutor</h2>
       </div>
       <ul>
            <li className="hover:scale-110 mb-4">
            <Link to="/admin" className="block py-2 hover:bg-gray-200" onClick={toggleSidebar}>
                <BsHouseDoor size={30} className="inline mr-2 hover:text-blue-800" />
                Dashboard
            </Link>
            </li>
            <li className="hover:scale-110 mb-4">
            <Link to="/admin/users/" className="block py-2 hover:bg-gray-200" onClick={''}>
                <BsPeople size={30} className="inline mr-2 hover:text-blue-800" />
                Create Slots
            </Link>
            </li>
            <li className="hover:scale-110 mb-4 cursor-pointer" onClick={handleLogout}>
                <p className="block py-2 hover:bg-gray-200" >
                    <HiOutlineClipboardList size={20} className="inline mr-2 hover:text-blue-800" />
                    logout
                </p>
        </li>
        </ul>
      </nav>
    </div>
  )
}

export default TutorSidebar
