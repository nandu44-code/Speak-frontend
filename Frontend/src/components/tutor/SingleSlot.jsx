import React from 'react';

const SingleSlot = ({ startDate, endDate, startTime, endTime, onDelete }) => {
  const handleDelete = () => {
    // Call the onDelete function passed from the parent component
    onDelete();
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 flex justify-between items-center">
      <div>
        <p className="text-gray-700 font-semibold">Date: {startDate}</p>
        <p className="text-gray-700">Start Time: {startTime}</p>
        <p className="text-gray-700">End Time: {endTime}</p>
      </div>
      <button
        onClick={handleDelete}
        className="border-2 border-red-500 text-red-900 px-4 py-2 rounded-md hover:bg-red-600 hover:cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
};

export default SingleSlot;
