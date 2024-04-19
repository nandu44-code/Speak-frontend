import React, { useDebugValue, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/Axios";
import { useDispatch } from "react-redux";
import SingleSlot from "../../components/tutor/SingleSlot";
import Navbar from "../../components/Navbar";
import { AiOutlineMessage } from "react-icons/ai";
import { RiUserFollowLine } from "react-icons/ri";
import { BiHide } from "react-icons/bi";
import { GrSchedule } from "react-icons/gr";

function TutorSideDetailsPage() {
  const { id } = useParams();
  console.log(id)
  const [userData, setUserData] = useState(null);
  // const currentdate = new Date();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [user, setUser] = useState("");
  const [slots, setSlots] = useState([]);

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("aneesh",id)
      const request = await api.get(
        `slot/slots/filter/?selected_date=${selectedDate}&created_by=${id}`
      );
      console.log(request.data);
      const response = request.data.results;
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
        setUser(id)
      } catch (error) {
        console.error();
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col mt-24 items-center p-10 bg-gray-100  shadow-sm shadow-black">
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
        <a href="#slots" className="w-full flex justify-center">
          <button className="flex justify-center bg-white text-black font-medium text-lg px-4 py-2 m-2 w-1/2 border-2 border-blue-600 rounded-md hover:border-2 hover:border-indigo-400 hover:text-black hover:bg-gray-200">
            <GrSchedule className="mt-1 mx-4" />
            Schedule
          </button>
        </a>
        <div className="flex w-1/2 justify-around my-5 sm:flex-row md:flex-col lg:flex-col xl:flex-row 2xl:flex-row">
          <button className="flex bg-indigo-900 text-white px-4 py-1 my-3 rounded-md font-semibold hover:bg-indigo-700 duration-1000">
            <RiUserFollowLine className="mt-1 mx-5" size={22} />
            Follow
          </button>
          <button className="flex bg-indigo-900 text-white px-4 py-1 my-3 rounded-md font-semibold hover:bg-indigo-700 duration-1000">
            {" "}
            <AiOutlineMessage className="mt-1 mx-5" size={22} />
            Message
          </button>
          <button className="flex bg-indigo-900 text-white px-4 py-1 my-3 rounded-md font-semibold hover:bg-indigo-700 duration-1000">
            <BiHide className="mt-1 mx-5" size={22} />
            Hide tutor
          </button>
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
      </div>
      <div className="flex justify-center items-center">
        <div
          className="w-1/2 mx-4  flex justify-center items-center bg-stone-400 h-28 rounded-2xl px-4 py-2 my-20"
          id="slots"
        >
          {/* <h2 className="text-xl font-bold mb-4">Search Slots by Date</h2> */}
          <form onSubmit={handleSubmit} className="flex items-center">
            {" "}
            {/* Added flex and items-center class */}
            <div className="mb-4">
              <label
                htmlFor="selectedDate"
                className="block text-white font-bold mb-2 cursor-pointer"
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
                default={selectedDate}
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
      </div>
      <div className="mb-10">
        {slots.length > 0 ? (
          slots.map((slot) => (
            <SingleSlot
              key={slot.id}
              id={slot.id}
              startDate={slot.start_date}
              startTime={slot.start_time}
              endTime={slot.end_time}
              is_booked={slot.is_booked}
              onDelete={() => handleDeleteSlot(slot.id)}
            />
          ))
        ) : (
          <p className="text-red-600">No results found</p>
        )}
      </div>
    </>
  );
}

export default TutorSideDetailsPage;
