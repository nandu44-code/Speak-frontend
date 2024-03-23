import React, { useDebugValue, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/Axios";
import { useDispatch } from "react-redux";
import SingleSlot from "../../components/tutor/SingleSlot";

function TutorSideDetailsPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [user, setUser] = useState("");
  const [slots, setSlots] = useState([]);

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await api.get(
        `slot/slots/filter/?selected_date=${selectedDate}&user=${id}`
      );
      console.log(request.data);
      const response = request.data;
      setSlots(response);
      // console.log(slots)
    } catch (error) {
      console.error("Error searching slots:", error);
      toast.error("Error searching slots");
    }
  };

  useEffect(() => {
    console.log(slots);
  }, [slots]);


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
        </div>
      </div>
      )}
     <div className="w-auto ml-80 bg-stone-200 h-28 rounded-2xl px-4 py-2 mt-32">
            {/* <h2 className="text-xl font-bold mb-4">Search Slots by Date</h2> */}
            <form onSubmit={handleSubmit} className="flex items-center">
              {" "}
              {/* Added flex and items-center class */}
              <div className="mb-4">
                <label
                  htmlFor="selectedDate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Select Date
                </label>
                <input
                  type="date"
                  id="selectedDate"
                  name="selectedDate"
                  value={selectedDate}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-900 w-80 text-white px-4 py-2 mt-4 rounded-md hover:bg-indigo-600 ml-2"
              >
                Search Slots
              </button>
            </form>
          </div>
          <div className="ml-96 mt-8">
          {slots.length > 0 ? (
            slots.map((slot) => (
              <SingleSlot
                key={slot.id}
                startDate={slot.start_date}
                startTime={slot.start_time}
                endTime={slot.end_time}
                onDelete={() => handleDeleteSlot(slot.id)}
              />
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
    </div>
  );
}

export default TutorSideDetailsPage;
