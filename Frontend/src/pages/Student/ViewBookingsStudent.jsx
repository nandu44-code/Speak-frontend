import React,{useState} from "react";
import StudentProfileSidebar from "../../components/StudentProfileSidebar";
import Navbar from "../../components/Navbar";

function ViewBookingsStudent() {
  
    const [status, setStatus] = useState('pending'); // Initial status: pending
    const [bookings, setBookings] = useState([]);
  
    const handleStatusChange = async (newStatus) => {
      setStatus(newStatus);
      try {
        const response = await api.get(`/bookings/filter/${newStatus}`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
  
    return (

    <>
    <Navbar/>
    <div className="flex flex-row">
        <StudentProfileSidebar/>
    
      <div className="container mx-auto px-4 py-8">
        <div className="bg-indigo-700 text-white px-4 py-2 mb-10 rounded-lg text-lg font-bold">
            View Your bookings
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => handleStatusChange('pending')}
            className={`mr-4 px-4 py-2 rounded-md ${status === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Pending
          </button>
          <button
            onClick={() => handleStatusChange('approved')}
            className={`px-4 py-2 rounded-md ${status === 'approved' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Approved
          </button>
        </div>
        <div>
          {/* Render bookings data here */}
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white shadow-md rounded-md p-4 mb-4">
              {/* Display booking details */}
              <p>Booking ID: {booking.id}</p>
              <p>Status: {booking.status}</p>
              {/* Add more booking details as needed */}
            </div>
          ))}
        </div>
        </div>
      </div>
      </>
    );
  };

export default ViewBookingsStudent;
