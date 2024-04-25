import React, { useState } from "react";
import StudentProfileSidebar from "../../components/StudentProfileSidebar";
import Navbar from "../../components/Navbar";
import { jwtDecode } from "jwt-decode";
import api from "../../services/Axios";

function ViewBookingsStudent() {
  const [status, setStatus] = useState("pending"); // Initial status: pending
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("accessToken");
  const access = jwtDecode(token);
  let user = access.user;

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    try {
      const response = await api.get(
        `slot/student/bookings/filter/${user}/${newStatus}`
      );
      console.log(response.data);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleCancelBooking = async (slot) =>{
    console.log(slot)
    try{
        const response = await api.delete(`slot/booking/${slot}/delete/`)
    }
    catch (error){
        console.error("error in deleting")
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <StudentProfileSidebar />

        <div className="container mx-auto px-96 py-8 pt-28">
          <div className="bg-stone-400 text-indigo-900 px-4 py-2 mb-10 rounded-lg text-lg font-bold">
            View Your bookings
          </div>
          <div className="flex justify-center mb-4">
            <button
              onClick={() => handleStatusChange("pending")}
              className={`mr-4 px-4 py-2 rounded-md ${
                status === "pending"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => handleStatusChange("confirmed")}
              className={`px-4 py-2 rounded-md ${
                status === "confirmed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Approved
            </button>
          </div>
        {bookings?  <div>
            {/* Render bookings data here */}
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white shadow-md shadow-gray-700 rounded-md p-4 mb-4"
              >
                <p className="text-indigo-950 font-normal text-lg">
                  Created by: {booking.slot_details.created_by.username}
                </p>
                <p className="text-indigo-900 font-semibold text-xl">
                  Status: {booking.status}
                </p>
                <p className="text-indigo-900 font-semibold text-xl">
                  Date: {booking.slot_details.start_date}
                </p>
                <p className="text-indigo-900 font-semibold text-lg">
                  Start time: {booking.slot_details.start_time}
                </p>
                <p className="text-indigo-900 font-semibold text-xl">
                  End time: {booking.slot_details.end_time}
                </p>
                {booking.status=='pending'?<button className="px-4 py-2 bg-red-500 text-white border-2 border-red-900 rounded-lg mt-10 cursor-pointer " onClick={()=>handleCancelBooking(booking.slot)}>cancel</button>:<div></div>}
              </div>
            ))}
          </div>:<div><p>No results found</p></div>}
        </div>
      </div>
    </>
  );
}

export default ViewBookingsStudent;
