import React, { useState, useEffect } from "react";
import StudentProfileSidebar from "../../components/StudentProfileSidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/Axios";
import { jwtDecode } from "jwt-decode";

function WalletPage() {
  const [amount, setAmount] = useState('');
  const [history, setHistory] = useState('');

  const [id, setId] = useState(null);

  useEffect(() => {
    const access = localStorage.getItem("accessToken");
    const accessToken = jwtDecode(access);
    setId(accessToken.user, "id is here");
    console.log(accessToken.user);
  }, []);

  useEffect(() => {
    const fetchWalletData = async () => {
      console.log(id, "this is the id inside the function");
      try {
        const response = await api.get(`/user-wallet/${id}/`);
        console.log(response.data);
        setAmount(response.data.balance);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
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
        setHistory([])
      }
    };

    fetchWalletData();
    fetch_wallet_history();
  }, [id]);

  return (
    <>
      <div className="flex flex-col">
        <Navbar />
      </div>
      <div className="flex flex-row">
        <StudentProfileSidebar />
        <div className="w-full flex justify-center mt-44">
          <div className="w-1/4 flex flex-col shadow-gray-300 shadow-md">
            <p className="font-bold text-2xl">Wallet</p>
            {amount ? (
              <p className="font-bold text-3xl text-gray-700 py-20">
                ₹{amount}
              </p>
            ) : (
              <p className="py-10 text-gray-600">Your wallet is empty</p>
            )}
            <div>
              <p className="text-gray-500">
                You can buy slots using the amount in your wallet
              </p>
            </div>
          </div>
          <div className="mx-20 shadow-md shadow-gray-300 px-10 rounded-md">
            <p className="font-bold text-gray-600 text-xl mb-6">Wallet History</p>
          {history.length > 0 ? (
            history.map((historyItem) => (
              <div
                key={historyItem.id}
                className="p-4 mb-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <p className="text-lg font-bold text-green-600">
                  <strong>Amount:</strong> {historyItem.amount}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Created At:</strong>{" "}
                  {new Date(historyItem.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No wallet history available.
            </div>
          )}
        </div>
        </div>
        
      </div>
    </>
  );
}

export default WalletPage;
