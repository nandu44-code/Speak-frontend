import React, { useState, useEffect } from "react";
import api from "../../services/Axios";
import {jwtDecode} from "jwt-decode";
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
      setFormData((prevFormData) => ({
        ...prevFormData,
        created_by: access.user,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateDatesAndTimes = () => {
    const { start_date, end_date, start_time, end_time } = formData;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set the time part of the current date to 00:00:00

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    console.log("Current Date:", currentDate);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    // Check if start date is before end date
    if (startDate >= endDate) {
      toast.error("Start date must be before end date.");
      console.log("Validation failed: Start date must be before end date.");
      return false;
    }

    // Check if start date and end date are in the future
    if (startDate < currentDate || endDate < currentDate) {
      toast.error("Dates must be in the future.");
      console.log("Validation failed: Dates must be in the future.");
      return false;
    }

    // Check if start time and end time are at least one hour apart
    const [startHour, startMinute] = start_time.split(":");
    const [endHour, endMinute] = end_time.split(":");

    const startDateTime = new Date(start_date);
    startDateTime.setHours(startHour, startMinute);

    const endDateTime = new Date(end_date);
    endDateTime.setHours(endHour, endMinute);

    const timeDifference = (endDateTime - startDateTime) / (1000 * 60 * 60);

    if (timeDifference < 1) {
      toast.error("Time difference must be at least one hour.");
      console.log("Validation failed: Time difference must be at least one hour.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Submitted");
    if (!validateDatesAndTimes()) {
      console.log("Validation failed");
      return;
    }

    console.log("Validation passed");

    try {
      await api.post("slot/slots/", formData);
      toast.success("Slot created successfully");
      console.log("Slot created successfully");
      setFormData({
        created_by: "",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
      })
    } catch (error) {
      console.error("Error creating slot:", error);
      toast.error("Error creating slot");
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
