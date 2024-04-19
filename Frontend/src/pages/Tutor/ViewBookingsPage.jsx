import React,{useState} from "react";
import { useEffect } from "react";
import TutorSidebar from "../../components/tutor/TutorSidebar";
import api from '../../services/Axios'
import { jwtDecode } from "jwt-decode";

function ViewBookingsPage() {
  const [status, setStatus] = useState("pending");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings based on the selected option when it changes
    const token = localStorage.getItem("accessToken");
    const access = jwtDecode(token);
    let tutor = '';
    if (access.is_tutor) {
      tutor = access.user; 
    }

    const fetchBookings = async () => {
        console.log(status,tutor)
      try {
        const response = await api.get(`/slot/bookings-listing/?tutor=${tutor}&status=${status}`);
        console.log(response.data)
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

  return (
    <div className="flex flex-row">
      <TutorSidebar />
      <div className="flex w-full justify-center">
        <div className="flex flex-col items-center mt-4">
          <div className="w-96 p-8 pb-4 bg-stone-400 text-center text-2xl text-white font-bold rounded-md">
            Bookings
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              className={`${
                status === "pending"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } px-4 py-2 rounded-md`}
              onClick={() => handleOptionClick("pending")}
            >
              Pending
            </button>
            <button
              className={`${
                status === "approved"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } px-4 py-2 rounded-md`}
              onClick={() => handleOptionClick("approved")}
            >
              Approved
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
              <th className="px-20 py-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => ((
                <tr>
                  <td className="border border-gray-400 px-4 py-2">{booking.booked_by_details.username}</td>
                  <td className="border border-gray-400 px-4 py-2">{booking.slot_details.start_date}</td>
                  <td className="border border-gray-400 px-4 py-2">{booking.slot_details.start_time}</td>
                  <td className="border border-gray-400 px-4 py-2">{booking.slot_details.end_time}</td>
                  <td className="border border-gray-400 px-4 py-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      Approve
                    </button>
                  </td>
                  
                  
                </tr>
              ) 
            ))}
          </tbody>
        </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookingsPage;
