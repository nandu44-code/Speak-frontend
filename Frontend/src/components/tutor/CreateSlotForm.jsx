// CreateSlotForm.jsx
import React, { useState } from 'react';
import api from '../../services/Axios';

function CreateSlotForm() {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/slots/', formData);
      // Optional: Redirect to slot list page or show success message
    } catch (error) {
      console.error('Error creating slot:', error);
    }
  };

  return (
    <div className="max-w-lg mr-96">
      <h2 className="text-xl font-bold mb-4">Create Slot</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startTime" className="block text-gray-700 font-bold mb-2">Start Time</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endTime" className="block text-gray-700 font-bold mb-2">End Time</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Create Slot
        </button>
      </form>
    </div>
  );
}

export default CreateSlotForm;
