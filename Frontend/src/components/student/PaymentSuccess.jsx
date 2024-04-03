import React from "react";
import Confetti from "react-confetti";
import paymentSuccessGif from '../../assets/images/payment.gif'
const PaymentSuccess = () => {
  return (
<div className="flex flex-col h-screen shadow-lg shadow-stone-700 justify-center items-center">
      {/* Payment successful message */}
      <div className="text-center shadow-2xl shadow-green-500 p-8 rounded-lg animate-bounce">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          Payment Successful!
        </h1>
      </div>
      
      {/* Image */}
      <img src={paymentSuccessGif} alt="Payment Successful GIF" className='w-1/4'/>
      
      {/* Confetti */}
      <div className="mt-8">
        <Confetti
          width="full"
          height="1200"
          numberOfPieces={100} // Number of confetti pieces
          recycle={true}
          gravity={0.3} // Example gravity value
          wind={0.1} // Example wind value
        />
      </div>
    </div>
  );
};

export default PaymentSuccess;
