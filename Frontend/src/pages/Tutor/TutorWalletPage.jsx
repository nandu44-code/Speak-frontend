import React, { useState, useEffect } from "react";
import TutorSidebar from "../../components/tutor/TutorSidebar";
import api from "../../services/Axios";
import {jwtDecode} from "jwt-decode";//

function TutorWalletPage() {
  const [wallet, setWallet] = useState("");

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
        </div>
      </div>

    </div>
  );
}

export default TutorWalletPage;
