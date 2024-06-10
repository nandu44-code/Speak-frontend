import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { Chart as ChartJS } from "chart.js/auto"; // Import necessary chart.js modules
import { Bar } from "react-chartjs-2";
import api from "../../services/Axios";

function AdminHomePage() {
  const [users, setUsers] = useState("");
  const [tutors, setTutors] = useState("");
  const [students, setStudents] = useState("");
  const [pending, setPending] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [blockedstudents, setBlockedStudents] = useState("");
  const [blockedusers, setBlockedUsers] = useState("");
  const [blockedTutors, setBlockedTutors] = useState("");
  const [completed, setCompleted] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsersCount = async () => {
      setLoading(true);
      try {
        const response = await api.get("user-count/");
        console.log(response, "users");
        setUsers(response.data.total_users);
        setStudents(response.data.total_students);
        setTutors(response.data.total_tutors);
        setBlockedTutors(response.data.total_blocked_tutors);
        setBlockedUsers(response.data.total_blocked_users);
        setBlockedStudents(response.data.total_blocked_students);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    const fetchBookingsCount = async () => {
      setLoading(true);
      try {
        const response = await api.get("slot/bookings-count/");
        console.log(response, "bookings");
        setPending(response.data.pending_bookings);
        setConfirmed(response.data.confirmed_bookings);
        setCompleted(response.data.completed_bookings);
        // setPending(10);
        // setConfirmed(12);
        // setCompleted(4);
      } catch (error) {
        console.error("Error fetching bookings count:", error);
      }
    };

    fetchBookingsCount();
    fetchUsersCount();
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex flex-col w-full">
        <div className="flex justify-center items-center w-full my-10">
          <p className="font-bold text-3xl text-indigo-600">Admin Dashboard</p>
        </div>
        <div className="flex justify-around">
          <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-rose-300">
            <p className="pt-10 text-red font-normal">Total users</p>
            {loading ? (
              <p className="text-4xl mt-5 text-red-700 font-bold">{users}</p>
            ) : (
              <p className="text-4xl mt-5 text-red-700 font-bold">{users}</p>
            )}
          </div>
          <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-sky-300">
            <p className="pt-10 text-red font-normal">Total Tutors</p>
            {loading ? (
              <p>loading...</p>
            ) : (
              <p className="text-4xl mt-5 text-red-700 font-bold">{tutors}</p>
            )}
          </div>
          <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-stone-300">
            <p className="pt-10 text-red font-normal">Total Students</p>
            {loading ? (
              <p>loading...</p>
            ) : (
              <p className="text-4xl mt-5 text-red-700 font-bold">{students}</p>
            )}
          </div>
        </div>
        <div className="flex justify-around mt-2">
          <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-yellow-200">
            <p className="pt-10 text-red font-normal">Total Blocked users</p>
            {loading ? (
              <p className="text-4xl mt-5 text-red-700 font-bold">{blockedusers}</p>
            ) : (
              <p className="text-4xl mt-5 text-red-700 font-bold">{blockedusers}</p>
            )}
          </div>
          <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-indigo-300">
            <p className="pt-10 text-red font-normal">Total Blocked Tutors</p>
            {loading ? (
              <p>loading...</p>
            ) : (
              <p className="text-4xl mt-5 text-red-700 font-bold">{blockedTutors}</p>
            )}
          </div>
          <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-green-500">
            <p className="pt-10 text-red font-normal">Total Blocked Students</p>
            {loading ? (
              <p>loading...</p>
            ) : (
              <p className="text-4xl mt-5 text-red-700 font-bold">{blockedstudents}</p>
            )}
          </div>
        </div>
        <div className="flex justify-start items-center mt-44 w-full">
          <div className="mx-10 my-1 w-full h-[500px]"> 
            <Bar
              data={{
                labels: ["Pending", "Confirmed", "Completed"],
                datasets: [
                  {
                    label: "Bookings",
                    data: [pending, confirmed, completed], // Use values directly
                    backgroundColor: ["rgba(79, 12, 200, 0.6)"],
                    borderColor: ["rgba(75, 192, 192, 1)"],
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
              height={500} // Adjust height here
              width={800} // Adjust width here
              className="w-full h-fit"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
