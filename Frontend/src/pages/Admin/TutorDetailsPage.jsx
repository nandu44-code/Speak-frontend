import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/Axios";
import { GiTeacher } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { FaLanguage } from "react-icons/fa6";
import { MdOutlinePlace } from "react-icons/md";
import Sidebar from "../../components/SideBar";


function TutorDetailsPage() {

    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.get(`user/${id}/`);
          console.log(response);
          setUserData(response.data);
        } catch (error) {
          console.error();
        }
      };
      fetchData();
    }, [id]);


  return (
    <>
    <div className="flex">
      <Sidebar/>
    </div>
    <div className="flex flex-col items-center w-full p-10 rounded-3xl m-10">
        <div className="flex flex-col items-center">
          {userData && (
            <img
              className="w-32 h-32 cursor-pointer mb-2 shadow-sm shadow-gray-300 rounded-full hover:scale-150 duration-500"
              src={userData.profile_image}
              alt="Profile"
            />
          )}
        </div>
        <div className="flex flex-col items-center mb-4">
          <p className="font-bold text-2xl text-gray-900">
            {userData && userData.first_name}
            <span className="mx-1">&nbsp;</span>
            {userData && userData.last_name}
          </p>
        </div>
        <div className="p-6 rounded-xl w-1/2 mb-6">
          {userData && (
            <div>
              <div className="flex flex-row gap-10">
                <div className="flex flex-col">
                  <p className="font-normal text-md text-gray-800 mb-4 px-2">
                    <span className="mr-4 py-1">
                      <FaUser color="indigo" />
                    </span>
                    Username
                  </p>
                  <p className="font-semibold mb-4 text-lg text-gray-800 bg-stone-200 px-4 py-2 rounded-md w-fit">
                    {userData.username}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="font-normal text-md text-gray-800 mb-4 px-2">
                    <span className="mr-4 py-1">
                      <FaLanguage color="orange" />
                    </span>
                    Dialect
                  </p>
                  <p className="font-semibold mb-4 text-lg text-gray-800 bg-stone-200 px-4 py-2 rounded-md w-fit">
                    {userData.tutor.dialect}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="font-normal text-md text-gray-800 mb-4 px-2">
                    <span className="mr-4 py-1">
                      <MdOutlinePlace color="green" size={18} />
                    </span>
                    State
                  </p>
                  <p className="font-semibold mb-4 text-lg text-gray-800 bg-stone-200 px-4 py-2 rounded-md w-fit">
                    {userData.tutor.state}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="font-normal text-md text-gray-800 mb-4 px-2">
                    <span className="mr-4 py-1">
                      <MdOutlinePlace color="green" size={18} />
                    </span>
                    Country
                  </p>
                  <p className="font-semibold mb-4 text-lg text-gray-800 bg-stone-200 px-4 py-2 rounded-md w-fit">
                    {userData.tutor.country}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-normal text-md text-gray-800 mb-4 px-2">
                  <span className="mr-4 py-1">
                    <FaUser color="indigo" />
                  </span>
                  Student Preferences
                </p>
                <div className="flex flex-wrap gap-2">
                  {userData.tutor.student_preferences.map((preference, index) => (
                    <p
                      key={index}
                      className="font-semibold text-lg text-gray-800 bg-stone-200 px-4 py-2 rounded-md"
                      >
                      {preference}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {userData && (
            <div>
              <div className="p-4">
                <p className="font-normal text-md text-gray-800 mb-4">
                  <span className="mr-4 py-1">
                    <FcAbout color="indigo" size={22} />
                  </span>
                  About me
                </p>
                <p className="font-normal text-lg text-gray-800 bg-stone-200 px-4 py-2 rounded-md">
                  {userData.tutor.introduction_description}
                </p>
              </div>
              <div className="rounded-xl p-4">
                <p className="font-normal text-md text-gray-800 mb-4">
                  <span className="mr-4 py-1">
                    <GiTeacher color="red" />
                  </span>
                  Teaching Style
                </p>
                <p className="font-normal text-lg text-gray-800 bg-stone-200 px-4 py-2 rounded-md">
                  {userData.tutor.teaching_style}
                </p>
              </div>
            </div>
          )}
          
        </div>
      </div>
  </>
  );
}

export default TutorDetailsPage;
