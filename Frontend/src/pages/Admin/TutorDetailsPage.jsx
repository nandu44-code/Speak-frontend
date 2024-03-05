import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/Axios";

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
              <p className="font-semibold text-xl">{userData.tutor.state},</p>
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
        <img
          src={userData.tutor.certificates}
          className=" w-80 h-40  ml-96 mr-10 mt-10 cursor-pointer "
        ></img>
      )}
    </div>
  );
}

export default TutorDetailsPage;
