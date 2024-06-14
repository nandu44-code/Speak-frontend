import React, { useState, useEffect } from "react";
import TutorSidebar from "../../components/tutor/TutorSidebar";
import api from "../../services/Axios";
import { jwtDecode } from "jwt-decode"; //

function TutorWalletPage() {
  const [wallet, setWallet] = useState("");
  const [history, setHistory] = useState("");

  useEffect(() => {
    const fetch_wallet_amount = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const access = jwtDecode(token);

        const id = access.user;

        const response = await api.get(`/user-wallet/${id}/`);
        setWallet(response.data.balance);
      } catch (error) {
        console.error("Error fetching wallet amount:", error);
      }
    };

    const fetch_wallet_history = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const access = jwtDecode(token);

        const id = access.user;

        const response = await api.get(`/wallet-history/`);
        console.log(response, "historyresponse");
        setHistory(response.data.results);
      } catch (error) {
        console.error("Error fetching wallet amount:", error);
      }
    };

    fetch_wallet_history();
    fetch_wallet_amount();
  }, []);

  return (
    <div className="flex">
      <TutorSidebar />
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-full flex justify-center mt-20">
          <div className="w-1/4 flex flex-col shadow-gray-300 shadow-md">
            <p className="font-bold text-2xl">My Wallet</p>
            {wallet ? (
              <p className="font-bold text-3xl text-gray-700 py-20">
                ₹{wallet}
              </p>
            ) : (
              <p className="py-10 text-gray-600">Your wallet is empty</p>
            )}
          </div>
          <div className="flex flex-col mx-20">
            <p className="text-2xl text-gray-600 mb-10">Recent wallet history</p>
            <div>
            {history.length > 0 ? (
                history.map(historyItem => (
                    <div key={historyItem.id} className="p-4 mb-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                        <p className="text-lg font-bold text-green-600"><strong>Amount:</strong> {historyItem.amount}</p>
                        <p className="text-sm text-gray-500"><strong>Created At:</strong> {new Date(historyItem.created_at).toLocaleString()}</p>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500">No wallet history available.</div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorWalletPage;
