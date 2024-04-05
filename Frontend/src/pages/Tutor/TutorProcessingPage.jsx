import React from "react";
import { BallTriangle } from "react-loader-spinner";
import { useSpring, animated } from "react-spring";
import { FaThumbsUp } from "react-icons/fa";
import imgSrc from "../../assets/images/thankyou.jpg";

function TutorProcessingPage() {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0.2 } });
  return (
    <div className="flex flex-row">
      <animated.img
        src={imgSrc}
        className="w-1/2 h-screen bg-slate"
        style={fadeIn}
        alt="Background"
      />

      <div className="flex flex-col justify-center items-center h-screen">
        <BallTriangle color="red" />
        <p className="text-3xl text-indigo-950 mt-10 ml-14 font-bold">
          Your Request is being processed by Admin
        </p>
      </div>
    </div>
  );
} 

export default TutorProcessingPage;
