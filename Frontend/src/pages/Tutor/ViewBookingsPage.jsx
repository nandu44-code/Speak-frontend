import React,{useState} from "react";
import { useEffect } from "react";
import TutorSidebar from "../../components/tutor/TutorSidebar";
import api from '../../services/Axios'
import { jwtDecode } from "jwt-decode";

function ViewBookingsPage() {
  const [status, setStatus] = useState("Pending");
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
        const response = await api.get(`slot/bookings/filter/${tutor}/${status}`);
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
                status === "Pending"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } px-4 py-2 rounded-md`}
              onClick={() => handleOptionClick("Pending")}
            >
              Pending
            </button>
            <button
              className={`${
                status === "Approved"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } px-4 py-2 rounded-md`}
              onClick={() => handleOptionClick("Approved")}
            >
              Approved
            </button>
          </div>
          <div className="mt-4 border border-gray-200 p-4 rounded-md">
            <table className="table-auto">
              {/* Table headers */}
              <thead>
                <tr>
                  <th>Booked By</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  {/* Add more columns as needed */}
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {/* Map over bookings and render rows */}
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.booked_by}</td>
                    {/* <td>{booking.startTime}</td>
                    <td>{booking.endTime}</td> */}
                    {/* Add more columns as needed */}
                  </tr>
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
