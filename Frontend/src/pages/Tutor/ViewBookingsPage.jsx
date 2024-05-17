import React, { useState, useCallback, useEffect } from "react";
import TutorSidebar from "../../components/tutor/TutorSidebar";
import api from '../../services/Axios';
import {jwtDecode} from "jwt-decode";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ViewBookingsPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const [roomID, setRoomID] = useState("");
  const [bookings, setBookings] = useState([]);
  const currentDate = new Date();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found");
        return;
      }
      const access = jwtDecode(token);
      if (!access.is_tutor) {
        console.error("User is not a tutor");
        return;
      }
      const tutor = access.user;

      try {
        const response = await api.get(`/slot/bookings-listing/?tutor=${tutor}&status=${status}`);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [status]);

  const handleOptionClick = (option) => {
    setStatus(option);
  };

  const handleApproval = async (bookingId) => {
    try {
      await api.patch(`/slot/booking-view/${bookingId}/`, { status: 'confirmed' });
      const token = localStorage.getItem("accessToken");
      const access = jwtDecode(token);
      const tutor = access.user;
      const response = await api.get(`/slot/bookings-listing/?tutor=${tutor}&status=${status}`);
      setBookings(response.data);
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };

  const handleCompleted = async (bookingId) => {
    try {
      await api.patch(`/slot/booking-view/${bookingId}/`, { status: 'completed' });
      const token = localStorage.getItem("accessToken");
      const access = jwtDecode(token);
      const tutor = access.user;
      const response = await api.get(`/slot/bookings-listing/?tutor=${tutor}&status=${status}`);
      setBookings(response.data);
    } catch (error) {
      console.error("Error completing booking:", error);
    }
  };

  const isCurrentTimeBetween = (startTime, endTime, startDate) => {
    const now = new Date();
    const startDateTime = new Date(startDate + " " + startTime);
    const endDateTime = new Date(startDate + " " + endTime);
    return now >= startDateTime && now <= endDateTime;
  };
  
  const isCurrentTimeAfterEndTime = (endTime) => {
    const now = new Date();
    const end = new Date(now.toDateString() + " " + endTime);
    return now >= end;
  };

  const handleCopyRoomId = (roomId) => {
    navigator.clipboard.writeText(roomId)
      .then(() => {
        Swal.fire("Copied!", "Room ID copied to clipboard.", "success");
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
        Swal.fire("Error!", "Failed to copy room ID to clipboard.", "error");
      });
  };

  const handleJoinRoom = useCallback(() => {
    navigate(`/room/${roomID}/`);
  }, [navigate, roomID]);

  return (
    <div className="flex flex-row">
      <TutorSidebar />
      <div className="flex w-full justify-center">
        <div className="flex flex-col items-center mt-4">
          <div className="w-96 p-6 bg-stone-400 text-center text-2xl text-white font-bold rounded-md shadow-md shadow-gray-700">
            Bookings
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              className={`${
                status === "pending" ? "bg-indigo-500 text-white" : "bg-gray-300 text-gray-700"
              } px-4 py-2 rounded-md`}
              onClick={() => handleOptionClick("pending")}
            >
              Pending
            </button>
            <button
              className={`${
                status === "confirmed" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
              } px-4 py-2 rounded-md`}
              onClick={() => handleOptionClick("confirmed")}
            >
              Approved
            </button>
            <button
              className={`${
                status === "completed" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
              } px-4 py-2 rounded-md`}
              onClick={() => handleOptionClick("completed")}
            >
              Completed
            </button>
          </div>
          <div className="mt-4 border border-gray-200 p-4 rounded-md">
            <table className="table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-20 py-5">Booked by</th>
                  <th className="px-20 py-5">Date</th>
                  <th className="px-20 py-5">Start time</th>
                  <th className="px-20 py-5">End time</th>
                  <th className="px-20 py-5">RoomId</th>
                  <th className="px-20 py-5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length ? bookings.map((booking) => (
                  <tr key={booking.slot}>
                    <td className="border border-gray-400 px-4 py-2 cursor-pointer">{booking.booked_by_details.username}</td>
                    <td className="border border-gray-400 px-4 py-2">{booking.slot_details.start_date}</td>
                    <td className="border border-gray-400 px-4 py-2">{booking.slot_details.start_time}</td>
                    <td className="border border-gray-400 px-4 py-2">{booking.slot_details.end_time}</td>
                    <td className="border border-gray-400 px-4 py-2">
                      <div>
                        {booking.room_id}
                        <button
                          className="px-4 py-2 bg-green-500 text-white font-semibold border-2 border-green-700 rounded-lg mt-2 cursor-pointer"
                          onClick={() => handleCopyRoomId(booking.room_id)}
                        >
                          Copy Room ID
                        </button>
                      </div>
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {isCurrentTimeAfterEndTime(booking.slot_details.end_time) && booking.status === 'confirmed' ? (
                        <button
                          className="px-4 py-2 bg-gray-500 text-white font-semibold border-2 border-gray-700 rounded-lg mt-2 cursor-pointer"
                          onClick={() => handleCompleted(booking.slot)}
                        >
                          Completed
                        </button>
                      ) : (
                        <>
                          {booking.status === 'pending' ? (
                            <div>
                              <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4"
                                onClick={() => handleApproval(booking.slot)}
                              >
                                Approve
                              </button>
                              <button className="bg-red-500 px-4 py-2 text-white rounded-md mx-2">Cancel</button>
                            </div>
                          ) : (
                            <>
                              {isCurrentTimeBetween(booking.slot_details.start_time, booking.slot_details.end_time, booking.slot_details.start_date) ? (
                                <>
                                  <input
                                    type="text"
                                    value={roomID}
                                    onChange={(e) => setRoomID(e.target.value)}
                                    placeholder="Enter the room ID"
                                  />
                                  <button
                                    className="px-4 py-2 bg-green-500 text-white font-semibold border-2 border-green-700 rounded-lg mt-2 cursor-pointer"
                                    onClick={handleJoinRoom}
                                  >
                                    Join
                                  </button>
                                </>
                              ) : (
                                booking.status !== 'completed' && (
                                  <button className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
                                )
                              )}
                            </>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                )) : <tr><td colSpan="6" className="text-center">No bookings found</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBookingsPage;
