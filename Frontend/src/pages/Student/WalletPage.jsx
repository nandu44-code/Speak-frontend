import React from "react";
import StudentProfileSidebar from "../../components/StudentProfileSidebar";
import Navbar from "../../components/Navbar";
function WalletPage() {
    
  return (
    <>
      <div className="flex flex-col">
        <Navbar />
      </div>
      <div className="flex flex-row">
        <StudentProfileSidebar />
        <div className="w-full flex justify-center mt-44">
          <div className="w-1/6 flex flex-col shadow-gray-300 shadow-md">
            <p className="font-bold text-2xl ">Wallet</p>
            <p>amount</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default WalletPage;
