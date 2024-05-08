import React from "react";
import Confetti from "react-confetti";
import { BsCheck2Circle } from "react-icons/bs";
import { Link } from "react-router-dom";
const PaymentSuccess = () => {
  return (
<div className="flex flex-col h-full justify-center items-center mt-44">
      {/* Payment successful message */}
      <div className="text-center shadow-md shadow-black p-8 rounded-lg h-96">
        <h1 className="text-4xl font-bold text-indigo-800 mb-4 animate-bounce">
          Payment Successful!
        </h1>
      <BsCheck2Circle size={100} color={'green'} className="ml-40 mt-16 animate-bounce"/>
      <p className="text-lg font-normal text-gray-700">Thank you for booking the slots Happy learning for you.</p>
      </div>      
      <div className="mt-8">
        <Confetti
          width="1600"
          height="1200"
          numberOfPieces={200}
          recycle={false}
          gravity={0.5} 
          wind={0} 
        />
        
        <Link to ='/student/findTutors/'
         className="bg-indigo-800 text-white px-3 py-4 rounded-md hover:shadow-none shadow-sm shadow-black">Go back to FindTutor's page</Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
