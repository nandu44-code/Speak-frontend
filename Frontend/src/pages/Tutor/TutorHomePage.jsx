import React, { useState, useEffect } from "react";
import TutorSidebar from "../../components/tutor/TutorSidebar";
import api from "../../services/Axios";

function TutorHomePage() {
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [completed, setCompleted] = useState("");
  useEffect(() => {
    const fetch_bookings_count = async () => {
      setLoading(true);
      try {
        const response = await api.get("/slot/bookings-count/");
        console.log(response, "users");
        setPending(response.data.pending_bookings);
        setConfirmed(response.data.confirmed_bookings);
        setCompleted(response.data.completed_bookings);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetch_bookings_count();
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-row">
      <TutorSidebar />
      <div className="flex flex-col w-full">
        <div className="flex justify-center items-center w-full">
          <p className="flex justify-center items-center w-full font-bold text-2xl text-indigo-600">Tutor Dashboard</p>
        </div>
        <div className="flex justify-around w-full mt-20">
          <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-rose-300">
            <p className="pt-10 text-red font-normal">Pending Bookings</p>
            {loading ? (
              <p className="text-4xl mt-5 text-red-700 font-bold">
                loading....
              </p>
            ) : (
              <p className="text-4xl mt-5 text-red-700 font-bold">
                {completed}
              </p>
            )}
          </div>
          <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-sky-300">
            <p className="pt-10 text-red font-normal">Completed Sessions</p>
            {loading ? (
              <p>loading...</p>
            ) : (
              <p className="text-4xl mt-5 text-red-700 font-bold">{pending}</p>
            )}
          </div>
          <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-stone-300">
            <p className="pt-10 text-red font-normal">Confirmed Bookings</p>
            {loading ? (
              <p>loading...</p>
            ) : (
              <p className="text-4xl mt-5 text-red-700 font-bold">
                {confirmed}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorHomePage;
