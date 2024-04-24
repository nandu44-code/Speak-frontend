import React, { useDebugValue, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/Axios";
import { useDispatch } from "react-redux";

function RequestDetailsPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`user/${id}/`);
        setUserData(response.data);
      } catch (error) {
        console.error();
      }
    };
    fetchData();
  }, [id]);

  const handleApproval = async () => {
    const credentials = {
      is_approved: true,
    };
    try {
      const response = await api.patch(`tutorlist/${id}/`, credentials);
      navigate("/admin/requests");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    const credentials = {
      is_rejected: true,
    };
    try {
      const response = await api.patch(`tutorlist/${id}/`, credentials);
      navigate("/admin/requests");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col items-center m-10 bg-stone-200 rounded-3xl p-10">
      {userData && (
        <img
          className="w-40 h-40 cursor-pointer mb-6"
          src={userData.profile_image}
          alt="Profile"
        />
      )}

      <div className="bg-slate-100 p-6 rounded-xl w-full mb-6">
        {/* <p className="font-bold text-2xl text-gray-500">Basic Details</p> */}
        <div className="flex flex-row justify-center mb-2">
    
          <p className="font-bold text-2xl text-violet-900 ml-2">
            {userData && userData.first_name}
            <span className="mx-1">&nbsp;</span>
            {userData && userData.last_name}
          </p>
        </div>

        <p className="font-bold text-2xl text-violet-900 mb-2">
          {userData && userData.email}
        </p>

        <div className="flex justify-center">
          <p className="font-semibold text-xl mr-4">
            {userData && userData.tutor.state}
          </p>
          <p className="font-semibold text-xl">
            {userData && userData.tutor.country}
          </p>
        </div>
      </div>

      {userData && (
        <div>
        <div className="bg-gray-100 rounded-xl p-4 m-2">
          <p className="font-bold text-2xl text-violet-900 mb-4">
            {userData.username}
          </p>
          <p className="font-normal mb-4">
            {userData.tutor.introduction_description}
          </p>
        </div>
        <div className="bg-gray-100 rounded-xl p-4">
          <label className="font-bold text-xl mb-2">Teaching style</label>
          <p className="font-thintext-2xl mb-4">
            {userData.tutor.teaching_style}
          </p>
          {/* <img
            src={userData.tutor.certificates}
            className="w-60 h-20 cursor-pointer mb-4"
            alt="Certificates"
          /> */}
        </div>
      </div>
      )}

      <div className="flex justify-evenly w-full mt-10">
        <button
          className="bg-gradient-to-br from-purple-600 to-blue-500 text-white py-2 px-8 rounded-md hover:bg-opacity-0 focus:ring-4 focus:outline-none focus:ring-blue-300"
          onClick={handleApproval}
        >
          Accept
        </button>
        <button
          className="border-red-600 font-semibold border-2 hover:bg-red-500 hover:text-white text-gray-800 px-6 py-2 rounded-lg"
          onClick={handleReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default RequestDetailsPage;
