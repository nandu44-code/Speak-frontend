import React from "react";
import { BallTriangle } from "react-loader-spinner";
import { useSpring, animated } from "react-spring";
import { FaThumbsUp } from "react-icons/fa";
import imgSrc from "../../assets/images/thankyou.jpg";
import Navbar from "../../components/Navbar";

function TutorProcessingPage() {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0.2 } });
  return (

    <div>
      <Navbar/>
      <div className="flex justify-center">
      {/* <animated.img
        src={imgSrc}
        className="w-1/2 h-screen bg-slate"
        style={fadeIn}
        alt="Background"
      /> */}

      <div className="flex flex-col justify-center items-center h-screen">
        <BallTriangle color="gray" />
        <p className="text-xl text-indigo-950 mt-10 ml-14 font-normal">
          Your Request is being processed by Admin
        </p>
        <p className="mt-2 text-md text-gray-800">Kindly wait for 2-3 business days</p>
      </div>
    </div>
    </div>
    
  );
} 

export default TutorProcessingPage;
