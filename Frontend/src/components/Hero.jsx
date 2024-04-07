import React, { useState, useEffect } from "react";
import imageSrc from "../assets/images/pexels-andrea-piacquadio-3772511.jpg";
import heroimage1 from "../assets/images/heroimage1.jpg";
import heroimage2 from "../assets/images/heroimage2.jpg";
import heroimage3 from "../assets/images/heroimage3.jpg";
import heroimage4 from "../assets/images/heroimage4.jpg";
import { FaArrowRight } from "react-icons/fa";

function Hero() {
  const backgroundImageUrl =
    "/assets/images/pexels-andrea-piacquadio-3772511.jpg";
 

  return (
    <div className="relative bg-stone-400 pt-24 bg-cover bg-dark flex flex-row-reverse items-center justify-center mt-0 w-full h-min opacity-95">
      <div className="relative flex flex-col justify-center items-center w-full h-full lg:w-1/2 rounded-2xl p-10 leading-tight">
        <h1
          className="font-bold text-indigo-900 text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-7xl select-none"
        >
          Online English Tutor Available Right Now!
        </h1>
        <p className="mt-5 text-gray-800 text-sm sm:text-md md:text-lg lg:text-base xl:text-xl select-none font-medium font-serif">
          Private online sessions with native English speakers
        </p>
        <button
          className="mt-8 bg-indigo-950 hover:bg-indigo-800 text-white py-3 px-6 rounded-lg font-semibold text-lg focus:outline-none animate-bounce flex flex-row"
          // style={{ background: colors[colorIndex] }}
        >
          Book Now
          <span className="mt-2 ml-10">
            <FaArrowRight />
          </span>
        </button>
      </div>
      <div className="flex flex-row justify-center items-end w-full h-full sm:w-3/4 sm:flex-row sm:flex-wrap md:w-1/2 md:flex-row md:flex-wrap lg:w-1/2 lg:flex-row lg:flex-wrap">
        <div className="relative w-1/4 h-1/4 m-4 rounded-2xl">
          <img
            src={heroimage3}
            alt="Description of the image"
            className="rounded-sm shadow-2xl w-full h-full"
          />
        </div>
        <div
          className="relative w-1/2 h-1/2 m-4 rounded-2xl"
          data-aos="zoom-out-right"
        >
          <img
            src={heroimage1}
            alt="Description of the image"
            className="rounded-sm shadow-2xl w-full h-full"
          />
        </div>
        <div className="relative w-1/2 h-1/2 m-4 rounded-2xl">
          <img
            src={heroimage2}
            alt="Description of the image"
            className="rounded-sm shadow-2xl w-full h-1/2"
          />
        </div>
        <div className="relative w-1/4 h-1/4 m-4 rounded-2xl">
          <img
            src={heroimage4}
            alt="Description of the image"
            className="rounded-sm shadow-2xl w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
