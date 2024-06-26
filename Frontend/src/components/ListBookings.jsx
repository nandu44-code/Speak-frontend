import React, { useState, useEffect } from 'react';
import api from '../services/Axios';

function ListBookings() {
  const [bookings, setBookings] = useState([]);
  const [page,setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get("slot/bookings-all/");
        if (response.status === 200) {
          console.log("Fetched all the bookings");
          console.log(response.data);
          setBookings(response.data);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchBookings();
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
  };


  return (
    <div className="flex flex-col justify-center items-center mt-20 w-full">
      <h1 className="text-2xl font-medium text-red-700 mb-10">Bookings</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse hover:table-fixed bg-gray-600 rounded-md">
          <thead>
            <tr className='bg-gray-300 divide-x-2'>
              <th className="px-4 py-5">ID</th>
              <th className="px-20 py-5">Booked By</th>
              <th className="px-20 py-5">Created by</th>
              <th className="px-20 py-5">Date</th>
              <th className="px-20 py-5">Time</th>
              <th className="px-20 py-5">status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2 text-white">{index + 1}</td>
                <td className="border border-gray-400 px-4 py-2 text-white">{booking.booked_by_details.username}</td>
                <td className="border border-gray-400 px-4 py-2 text-white">{booking.slot_details.created_by.username}</td>
                <td className="border border-gray-400 px-4 py-2 text-white">{booking.slot_details.start_date}</td>
                <td className="border border-gray-400 px-4 py-2 text-white">{booking.slot_details.start_time} to {booking.slot_details.end_time}</td>
                <td className="border border-gray-400 px-4 py-2 text-white font-semibold">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-indigo-800 px-4 py-2 mx-4 text-white rounded-md cursor-pointer hover:bg-indigo-900"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="bg-indigo-800 px-4 py-2 mx-4 text-white rounded-md cursor-pointer hover:bg-indigo-900"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ListBookings;
