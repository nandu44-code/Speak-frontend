import React from "react";
import { useLocation } from "react-router-dom";

const SingleSlot = ({ startDate, startTime, endTime, onDelete }) => {
  const handleDelete = () => {
    // Call the onDelete function passed from the parent component
    onDelete();
  };

  const handleBooking = () => {
    console.log("booking ")
  }

  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="flex justify-center items-center">
    <div className="border w-1/2 border-gray-300 rounded-lg p-4 mb-4 flex justify-between items-center duration-1000 hover:bg-stone-200 hover:cursor-pointer">
      <div>
        <p className="text-Indigo-800 font-bold">Date: {startDate}</p>
        <p className="text-blue-700 font-semibold">Start Time: {startTime}</p>
        <p className="text-red-700 font-semibold">End Time: {endTime}</p>
      </div>
      {location.pathname == "/tutor/viewslot/" ? (
        <button
          onClick={handleDelete}
          className="border-2 border-red-500 text-red-900 px-4 py-2 rounded-md hover:bg-red-400 hover:text-white hover:cursor-pointer"
        >
          Delete
        </button>
      ) : (
        <button className="border-2 border-red-500 text-red-900 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white hover:cursor-pointer
        " onClick={handleBooking}>
          Book
        </button>
      )}
    </div>
    </div>
  );
};

export default SingleSlot;
