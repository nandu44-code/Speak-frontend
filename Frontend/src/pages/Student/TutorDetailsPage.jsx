import React, { useDebugValue, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/Axios";
import { useDispatch } from "react-redux";
import SingleSlot from "../../components/tutor/SingleSlot";
import Navbar from "../../components/Navbar";
import { GiTeacher } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { FaLanguage } from "react-icons/fa6";
import { MdOutlinePlace } from "react-icons/md";

// import { AiOutlineMessage } from "react-icons/ai";
// import { RiUserFollowLine } from "react-icons/ri";
// import { BiHide } from "react-icons/bi";
// import { GrSchedule } from "react-icons/gr";

function TutorSideDetailsPage() {
  const { id } = useParams();
  console.log(id);
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
      console.log("aneesh", id);
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
        console.log(response.data);
        setUserData(response.data);
        setUser(id);
      } catch (error) {
        console.error();
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col mt-24 items-center p-5 bg-white shadow-sm shadow-gray-100 ">
        <div className="flex flex-row p-5 rounded-md mt-4">
          {userData && (
            <img
              className="w-32 h-32 cursor-pointer mb-2 shadow-sm shadow-gray-300 rounded-full hover:scale-150 duration-500"
              src={userData.profile_image}
              alt="Profile"
            />
          )}
        </div>
        <div className="flex flex-row justify-center mb-4">
          <p className="font-bold text-2xl text-gray-900 ml-2">
            {userData && userData.first_name}
            <span className="mx-1">&nbsp;</span>
            {userData && userData.last_name}
          </p>
        </div>

        <div className="flex w-1/2 justify-center my-5 sm:flex-row md:flex-col lg:flex-col xl:flex-row 2xl:flex-row">
          <button className="flex bg-violet-500 text-white px-5 py-2 m-3 rounded-md font-semibold hover:bg-indigo-700 duration-1000">
            Follow
          </button>
          <a href="#slots" className="">
            <button className="flex bg-blue-500 text-white px-10 py-2 m-3 rounded-md font-semibold hover:bg-indigo-700 duration-1000">
              Schedule
            </button>
          </a>
          <button className="flex bg-sky-400 text-white px-10 py-2 m-3 rounded-md font-semibold hover:bg-indigo-700 duration-1000">
            {" "}
            Message
          </button>
        </div>

        <div className="p-6 rounded-xl w-1/2 mb-6">
          {userData && (
            <div>
              <div className="flex flex-row gap-10">
              <div className="flex flex-col">
                <p className="font-normal flex justify-start text-md text-gray-800 mb-4 px-2">
                  <span className="mr-4 py-1">
                    <FaUser color="indigo" />
                  </span>
                  Username
                </p>
                <p className="font-semibold mb-4 flex justify-start text-lg text-gray-800 bg-stone-200 px-4 py-2 rounded-md w-fit">
                  {userData.username}
                </p>
              </div>
                <div>
                  <p className="font-normal flex justify-start text-md text-gray-800 mb-4 px-2">
                    <span className="mr-4 py-1">
                      <FaLanguage color="orange" />
                    </span>
                    Dialect
                  </p>
                  <p className="font-semibold mb-4 flex justify-start text-lg text-gray-800 bg-stone-200 px-4 py-2 rounded-md w-fit">
                    {userData.tutor.dialect}
                  </p>
                </div>
                <div>
                  <p className="font-normal flex justify-start text-md text-gray-800 mb-4 px-2">
                    <span className="mr-4 py-1">
                      <MdOutlinePlace color="green" size={18}/>
                    </span>
                    State
                  </p>
                  <p className="font-semibold mb-4 flex justify-start text-lg text-gray-800 bg-stone-200 px-4 py-2 rounded-md w-fit">
                    {userData.tutor.state}
                  </p>
                </div>
                <div>
                  <p className="font-normal flex justify-start text-md text-gray-800 mb-4 px-2">
                    <span className="mr-4 py-1">
                      <MdOutlinePlace color="green" size={18} />
                    </span>
                    Country
                  </p>
                  <p className="font-semibold mb-4 flex justify-start text-lg text-gray-800 bg-stone-200 px-4 py-2 rounded-md w-fit">
                    {userData.tutor.country}
                  </p>
                </div>
              </div>
              
            </div>
          )}
          {userData && (
            <div>
              <div className="p-4">
                <p className="font-normal flex justify-start text-md text-gray-800 mb-4">
                  <span className="mr-4 py-1">
                    <FcAbout color="indigo" size={22} />
                  </span>
                  About me
                </p>
                <p className="font-normal mb-4 text-lg text-gray-800 bg-stone-200 px-4 py-2 rounded-md">
                  {userData.tutor.introduction_description}
                </p>
              </div>
              <div className="rounded-xl p-4">
                <p className="font-normal flex justify-start text-md text-gray-800 mb-4">
                  <span className="mr-4 py-1">
                    <GiTeacher color="red" />
                  </span>
                  Teaching Style
                </p>
                <p className="font-normal mb-4 text-lg text-gray-800 bg-stone-200 px-4 py-2 rounded-md">
                  {userData.tutor.teaching_style}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div
          className="w-1/2 mx-4  flex justify-center items-center bg-stone-200 h-28 rounded-2xl px-4 py-2 mb-20"
          id="slots"
        >
          {/* <h2 className="text-xl font-bold mb-4">Search Slots by Date</h2> */}
          <form onSubmit={handleSubmit} className="flex items-center">
            {" "}
            {/* Added flex and items-center class */}
            <div className="mb-4">
              <label
                htmlFor="selectedDate"
                className="block text-gray-600 font-semibold mb-2 cursor-pointer"
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
