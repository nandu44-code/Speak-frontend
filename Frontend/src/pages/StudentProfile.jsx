import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyProfile,changeUserName } from "../features/userSlice";
import { jwtDecode } from "jwt-decode";
import { FaEdit } from "react-icons/fa";
import Navbar from "../components/Navbar";
import imageSrc from "../assets/images/profileuser.jpg";
import UserprofileSidebar from "../components/UserProfileSidebar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function StudentProfile() {
  const dispatch = useDispatch();
  const userprofile = useSelector((state) => state.user.user);
  const [isUploadButton,setIsUploadButton] = useState(false)
  const [username,setUsername] = useState(userprofile ? userprofile.username :'')

  const uploadButton = () =>{
    setIsUploadButton(true)
  }
  const handleInputBlur = () => {
    setIsUploadButton(false);
  };


  const token = localStorage.getItem("accessToken");
  const access = jwtDecode(token);

  useEffect(() => {
    dispatch(getMyProfile(access.user));
  
  }, []);
  
  console.log(username)
  const updateUsername = async() => {
    console.log('its updatedusername')

    if((username).split(" ").join("") == ''){

      toast.error('username should not be empty')
      
    }else if(username.length <=3){
      toast.error("username shoule contain atleast 4 characters")
    }
    else if(username == userprofile.username){
      toast.error('No changes detected')
    }
    else{

    const credentials={
      "id":access.user,
      "username": username,
      "email":userprofile.email,
      "password":userprofile.password
    }

    await dispatch(changeUserName(credentials))
  }
  }
  const handleEditClick = () => {
    
    alert("File dialog for changing profile picture will be opened.");
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <UserprofileSidebar className='justify-start'/>
        <div className="ml-72 mt-20">
          <div
            className="max-w-md mx-auto bg-white shadow-stone-950 rounded-md border-2 px-8 pt-6 pb-8 mb-4 text-center relative "
 
          >
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => {
                console.log("File selected:", e.target.files[0]);
              }}
            />

            <label htmlFor="fileInput" onClick={handleImageClick}>
              <img
                src={imageSrc}
                alt="User Image"
                className="mx-auto rounded-full w-32 h-32 mb-4 cursor-pointer hover:scale-125 transition duration-500"
              />
            </label>

            <input className="text-md text-purple-800 font-bold mb-2 rounded-lg border border-gray-300 focus:border-blue-500 px-3 py-2"
              defaultValue={userprofile && userprofile.username} onFocus={uploadButton}  onChange={(e) => setUsername(e.target.value)}
            />
           
            <input className="text-md text-purple-600 font-bold mb-2 rounded-lg border border-gray-300 focus:border-blue-500 px-3 py-2"
              value = {userprofile && userprofile.email}
            />
            <div className="mt-5">
            {isUploadButton && <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              onClick={updateUsername}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-500 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Update
              </span>
            </button>
            }
            </div>
            <h5 className="font-medium text-gray-500">Joined on  </h5>
            <p className="font-thin text-xs font-mono mt-1 text-red-500">{ userprofile && userprofile.date_joined}</p>
  
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentProfile;
