import React, { useState, useEffect } from "react";
import TutorSidebar from "../../components/tutor/TutorSidebar";
import api from "../../services/Axios";
import { jwtDecode } from "jwt-decode";
import { Chart as ChartJS } from "chart.js/auto"; // Import necessary chart.js modules
import { Bar } from "react-chartjs-2";

function TutorHomePage() {
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [completed, setCompleted] = useState("");
  const [slotscount, setSlotscount] = useState("");
  const [bookedSlots, setBookedSlots] = useState("");
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    const fetch_bookings_count = async () => {
      setLoading(true);
      try {
        const response = await api.get("/slot/bookings-count/");
        console.log(response, "users");
        setPending(response.data.pending_bookings);
        setConfirmed(response.data.confirmed_bookings);
        setCompleted(response.data.completed_bookings);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    const fetch_slots_count = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const access = jwtDecode(token);

        if (!access.is_tutor) {
          console.error("User is not a tutor");
          return;
        }
        const tutor = access.user;

        const response = await api.get(`/slot/slots-count/${tutor}/`);
        console.log(response, "response_slots_count");
        setSlotscount(response.data.slots_count);
        setBookedSlots(response.data.booked_slots);
      } catch (error) {
        console.log(error, "error is this ");
      }
    };

    const fetch_wallet_amount = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const access = jwtDecode(token);

        const id = access.user;

        const response = await api.get(`/user-wallet/${id}/`);
        setWallet(response.data.balance);
      } catch (error) {
        console.log(error, "error ");
      }
    };

    fetch_bookings_count();
    fetch_slots_count();
    fetch_wallet_amount();
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-row">
      <TutorSidebar />
      <div className="flex flex-col ml-64  w-full">
        <div className="flex justify-center items-center w-full my-10">
          <p className="font-bold text-2xl text-indigo-600">Tutor Dashboard</p>
        </div>
        <div className="flex justify-around">
          <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-rose-300">
            <p className="pt-10 text-red font-normal">Pending Bookings</p>
            {loading ? (
              <p className="text-4xl mt-5 text-red-700 font-bold">
                loading....
              </p>
            ) : (
              <p className="text-4xl mt-5 text-red-700 font-bold">{pending}</p>
            )}
          </div>
          <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-sky-300">
            <p className="pt-10 text-red font-normal">Completed Sessions</p>
            {loading ? (
              <p>loading...</p>
            ) : (
              <p className="text-4xl mt-5 text-red-700 font-bold">
                {completed}
              </p>
            )}
          </div>
          <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-stone-300">
            <p className="pt-10 text-red font-normal">Confirmed Bookings</p>
            {loading ? (
              <p>loading...</p>
            ) : (
              <p className="text-4xl mt-5 text-red-700 font-bold">
                {confirmed}
              </p>
            )}
          </div>
          <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-green-300">
            <p className="pt-10 text-red font-normal">Total slots</p>
            {loading ? (
              <p>loading...</p>
            ) : (
              <p className="text-4xl mt-5 text-red-700 font-bold">
                {slotscount}
              </p>
            )}
          </div>
        </div>
        <div className="flex w-full justify-center items-center">
          <div className="mt-20 bg-white shadow-lg shadow-gray-500 px-2 py-6 w-1/2 rounded-lg">
            <p className="px-4 py-6 text-xl text-green-700 font-semibold">
              Your Wallet Amount
            </p>
            <p className="px-4 py-6 font-bold text-6xl text-gray-600">
              {wallet}
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="flex justify-start items-center mt-44 w-full">
            <div className="mx-10 my-1 w-full h-[500px]">
              <Bar
                data={{
                  labels: ["Pending", "Confirmed", "Completed"],
                  datasets: [
                    {
                      label: "Bookings",
                      data: [pending, confirmed, completed],
                      backgroundColor: ["rgba(79, 120, 200, 0.6)"],
                      borderColor: ["rgba(7, 192, 196, 1)"],
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
    </div>
  );
}

export default TutorHomePage;
