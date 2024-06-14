import React, { useState, useEffect } from "react";
import TutorSidebar from "../../components/tutor/TutorSidebar";
import api from "../../services/Axios";
import { jwtDecode } from "jwt-decode";
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
      } finally {
        setLoading(false);
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
  }, []);

  const checkWalletAmount = () =>{
    if( wallet != 0){

      return true
    }
    else{
      return false
    }
  }

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <TutorSidebar />
      <div className="flex flex-col ml-64 w-full overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center items-center w-full mt-10 mb-20">
            <p className="font-bold text-5xl text-indigo-600 fixed">Tutor Dashboard</p>
          </div>
          <div className="flex justify-around">
            <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-pink-600">
              <p className="pt-10 text-white font-semibold">Pending Bookings</p>
              {loading ? (
                <p className="text-white">
                  loading....
                </p>
              ) : (
                <p className="text-4xl mt-5 text-white font-bold">{pending}</p>
              )}
            </div>
            <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-sky-600">
              <p className="pt-10 text-white font-semibold">Completed Sessions</p>
              {loading ? (
                <p className="text-white">
                  loading....
                </p>
              ) : (
                <p className="text-4xl mt-5 text-white font-bold">
                  {completed}
                </p>
              )}
            </div>
            <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-orange-600">
              <p className="pt-10 text-white font-semibold">Confirmed Bookings</p>
              {loading ? (
                <p className="text-white">
                  loading....
                </p>
              ) : (
                <p className="text-4xl mt-5 text-white font-bold">
                  {confirmed}
                </p>
              )}
            </div>
            <div className="w-44 h-44 shadow-sm shadow-gray-500 rounded-md bg-green-600">
              <p className="pt-10 text-white font-semibold">Total slots</p>
              {loading ? (
                <p className="text-white">
                  loading....
                </p>
              ) : (
                <p className="text-4xl mt-5 text-white font-bold">
                  {slotscount}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center mt-10">
            <div className="bg-white shadow-lg shadow-gray-500 px-2 py-6 rounded-lg w-1/2">
              <p className="px-4 py-6 text-xl text-green-700 font-semibold">
                Your Wallet Amount
              </p>
              <p className="px-4 py-6 font-bold text-6xl text-gray-600">
                {wallet}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center mt-10">
            <div className="bg-white shadow-lg shadow-gray-500 px-2 py-6 rounded-lg">
              <Bar
                data={{
                  labels: ["Pending", "Confirmed", "Completed"],
                  datasets: [
                    {
                      label: "Bookings",
                      data: [pending, confirmed, completed],
                      backgroundColor: "rgba(100, 120, 100, 0.8)",
                      borderColor: "rgba(7, 192, 196, 1)",
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
                height={500}
                width={800}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorHomePage;
