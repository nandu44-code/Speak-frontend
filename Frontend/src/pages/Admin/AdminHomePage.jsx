import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { Chart as ChartJS } from "chart.js/auto"; // Import necessary chart.js modules
import { Bar } from "react-chartjs-2";
import api from "../../services/Axios";

function AdminHomePage() {

  const [users,setUsers] = useState('')
  const [tutors,setTutors] = useState('')
  const [students,setStudents] = useState('')
  const [pending,setPending] = useState('')
  const [confirmed,setConfirmed] = useState('')
  const [completed,setCompleted] = useState('')
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    const fetchUsersCount = async () => {
      setLoading(true)
      try {
        const response = await api.get('user-count/');
        console.log(response, 'users');
        setUsers(response.data.total_users)
        setStudents(response.data.total_students)
        setTutors(response.data.total_tutors)
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    const fetch_bookings_count = async () => {
      setLoading(true)
      try {
        const response = await api.get('/bookings-count/');
        console.log(response, 'users');
        setPending(response.data.pending_bookings)
        setConfirmed(response.data.confirmed_bookings)
        setCompleted(response.data.completed_bookings)
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetch_bookings_count();
    fetchUsersCount();
    setLoading(false)
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
{     loading ?<p className="text-4xl mt-5 text-red-700 font-bold">{users}</p>:<p className="text-4xl mt-5 text-red-700 font-bold">{users}</p>
}          </div>
          <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-sky-300">
            <p className="pt-10 text-red font-normal">Total Tutors</p>
{   loading?<p>loading...</p> : <p className="text-4xl mt-5 text-red-700 font-bold">{tutors}</p>
}          </div>
          <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-stone-300">
            <p className="pt-10 text-red font-normal">Total Students</p>
{           loading ?<p>loading...</p> : <p className="text-4xl mt-5 text-red-700 font-bold">{students}</p>
}          </div>
        </div>
        <div className="flex justify-center items-center mt-44 w-full">
          <div className="mx-10 my-10">
            <Bar
              data={{
                labels: ["Pending", "confirmed", "completed"],
                datasets: [
                  {
                    label: "Booking",
                    data: [{pending}, {confirmed}, {completed}],
                    backgroundColor: ["rgba(79, 12, 200,0.6)"],
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
              height={320}
              className="w-full h-fit"
            />
          </div>

          {/* <div className="mx-10 my-10" style={{ height: '320px', width: '480px' }}>
            <Bar
              data={{
                labels: ["A", "B", "C"],
                datasets: [
                  {
                    label: "Revenue",
                    data: [200, 300, 500],
                    backgroundColor: ["rgba(70, 7, 20,0.6)"],
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
              height={320}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
