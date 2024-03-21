import React from 'react';

const SingleSlot = ({ startDate, startTime, endTime, onDelete }) => {
  const handleDelete = () => {
    // Call the onDelete function passed from the parent component
    onDelete();
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 flex justify-between items-center hover:scale-95 duration-1000 hover:bg-stone-200 hover:cursor-pointer">
      <div>
        <p className="text-Indigo-800 font-bold">Date: {startDate}</p>
        <p className="text-blue-700 font-semibold">Start Time: {startTime}</p>
        <p className="text-red-700 font-semibold">End Time: {endTime}</p>
      </div>
      <button
        onClick={handleDelete}
        className="border-2 border-red-500 text-red-900 px-4 py-2 rounded-md hover:bg-red-400 hover:text-white hover:cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
};

export default SingleSlot;
