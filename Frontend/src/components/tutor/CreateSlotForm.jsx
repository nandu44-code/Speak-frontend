import React, { useState, useEffect } from "react";
import api from "../../services/Axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function CreateSlotForm() {
  const [formData, setFormData] = useState({
    created_by: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const access = jwtDecode(token);

    if (access.is_tutor) {
      console.log('tutor')
      setFormData((prevFormData) => ({
        ...prevFormData,
         created_by: access.user,
      }));
    }
  }, []);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("slot/slots/", formData);
      // Optional: Redirect to slot list page or show success message
      toast.success("Slot created successfully");
    } catch (error) {
      console.error("Error creating slot:", error);
    }
  };

  return (
    <div className="max-w-2xl w-full shadow-md shadow-black p-10 rounded-lg">
      <h2 className="text-xl text-indigo-700 font-bold mb-4">Create Slot</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="start_date" className="block text-gray-700 font-bold mb-2">
            Start Date
          </label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="end_date" className="block text-gray-700 font-bold mb-2">
            End Date
          </label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="start_time" className="block text-gray-700 font-bold mb-2">
            Start Time
          </label>
          <input
            type="time"
            id="start_time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="end_time" className="block text-gray-700 font-bold mb-2">
            End Time
          </label>
          <input
            type="time"
            id="end_time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Slot
        </button>
      </form>
    </div>
  );
}

export default CreateSlotForm;
