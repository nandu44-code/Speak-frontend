import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/Axios";
import { useDispatch } from "react-redux";

function RequestDetailsPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate()


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

  const handleApproval = async()=>{
    const credentials = {
        is_approved:true
    }
   try{
    const response = await api.patch(`users/${id}/`,credentials);
    console.log(response.data)
    navigate('/admin/requests')
   }catch(error){
    console.log(error)
   }
  }

  return (
    <div className="flex flex-col justify-center m-20">
      <div className="flex">
        {userData && (
          <img
            className=" w-40 h-40  ml-96 mr-10 cursor-pointer rounded-full"
            src={userData.profile_image}
          ></img>
        )}
        <div className="flex flex-col">
          {userData && (
            <p className="font-bold text-2xl text-violet-900">
              {userData.username}
            </p>
          )}
          {userData && <p className="font-bold text-2xl">{userData.email}</p>}
          <div className="flex">
            {userData && (
              <p className="font-semibold text-xl">{`${userData.tutor.state},`}</p>
            )}
            {userData && (
              <p className="font-semibold text-xl">{userData.tutor.country}</p>
            )}
          </div>
        </div>
      </div>

      {userData && (
        <p className="font-bold text-2xl text-violet-900">
          {userData.username}
        </p>
      )}
      {userData && (
        <p className="font-normal">{userData.tutor.introduction_description}</p>
      )}
      <label className="font-bold text-xl">
        Teaching style
        {userData && (
          <p className="font-bold text-2xl">{userData.tutor.teaching_style}</p>
        )}
      </label>

      {userData && (
        <a
          href={userData.tutor.certificates}
          className="text-blue-900 font-semibold text-xl mt-10"
        >
          Download & view certificates
        </a>
      )}

      <div className="m-20 flex justify-evenly">
        {/* <button className='bg-indigo-500 px-3 py-1 text-white rounded hover:bg- hover:scale-110 duration-500'>Accept</button> */}
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        onClick={handleApproval}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-500 bg-purple-700 rounded-md group-hover:bg-opacity-0">
            Accept
          </span>
        </button>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-100 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white "
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-500 bg-white dark:bg-red-500 rounded-md group-hover:bg-opacity-0">
            Reject
          </span>
        </button>
      </div>
    </div>
  );
}

export default RequestDetailsPage;
