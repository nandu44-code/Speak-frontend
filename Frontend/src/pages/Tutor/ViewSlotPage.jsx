import React, { useState, useEffect } from "react";
import TutorSidebar from "../../components/tutor/TutorSidebar";
import api from "../../services/Axios";
import { jwtDecode } from "jwt-decode";
import SingleSlot from "../../components/tutor/SingleSlot";
import { toast } from "react-toastify";

function ViewSlotPage() {
  const [selectedDate, setSelectedDate] = useState("");
  // const [user, setUser] = useState("");
  const [slots, setSlots] = useState([]);
  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   const access = jwtDecode(token);

  //   if (access.is_tutor) {
  //     setUser(access.user);
  //   }
  // }, []);

  useEffect(() => {
    console.log(slots);
  }, [slots]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const access = jwtDecode(token);
    let user = ''; // Define user variable outside of the if block
  
    if (access.is_tutor) {
      user = access.user; // Assign value to user variable
    }
  
    try {
      const request = await api.get(
        `slot/slots/filter/?selected_date=${selectedDate}&created_by=${user}`
      );
      console.log(request.data);
      const response = request.data;
      setSlots(response);
      // console.log(slots)
    } catch (error) {
      console.error("Error searching slots:", error);
      toast.error("Error searching slots");
    }
  };
  

  const handleDeleteSlot = async (id) => {
    try {
      await api.delete(`slot/slots/${id}/`);
      
      setSlots(slots.filter(slot => slot.id !== id));
      toast.success('Slot deleted successfully')
    } catch (error) {
      console.error("Error deleting slot:", error);
      toast.error("Error deleting slot");
    }
  };

  return (
    <div className="flex">
      
        <TutorSidebar />
      
      <div className="flex flex-col">
        <div className="flex justify-center">
          <div className="w-auto ml-80 bg-stone-200 h-28 rounded-2xl px-4 py-2 mt-32">
            {/* <h2 className="text-xl font-bold mb-4">Search Slots by Date</h2> */}
            <form onSubmit={handleSubmit} className="flex items-center">
              {" "}
              {/* Added flex and items-center class */}
              <div className="mb-4">
                <label
                  htmlFor="selectedDate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Select Date
                </label>
                <input
                  type="date"
                  id="selectedDate"
                  name="selectedDate"
                  value={selectedDate}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-900 w-80 text-white px-4 py-2 mt-4 rounded-md hover:bg-indigo-600 ml-2"
              >
                Search Slots
              </button>
            </form>
          </div>
        </div>
        <div className="ml-96 mt-8">
          {slots.length > 0 ? (
            slots.map((slot) => (
              <SingleSlot
                key={slot.id}
                id={slot.id}
                startDate={slot.start_date}
                startTime={slot.start_time}
                endTime={slot.end_time}
                onDelete={() => handleDeleteSlot(slot.id)}
              />
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewSlotPage;
