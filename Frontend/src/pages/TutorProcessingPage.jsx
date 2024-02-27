import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { FaThumbsUp } from "react-icons/fa";

function TutorProcessingPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex ">
        <FaThumbsUp size={40} color="purple" className="mr-10 mb-44"/>
        <p className="font-bold text-2xl text-stone-600 m-30">
          Thank you for registering
        </p>
      </div>
      <RotatingLines className='mb-44'/>
      <p className="text-slate-800 text-3xl mt-10 ml-14 font-thin">
        Your appliication is being processed by admin
      </p>
    </div>
  );
}

export default TutorProcessingPage;
