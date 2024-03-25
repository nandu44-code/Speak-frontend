import React from 'react';
import imageSrc from '../assets/images/pexels-andrea-piacquadio-3772511.jpg';

function Hero() {
  const backgroundImageUrl = '/assets/images/pexels-andrea-piacquadio-3772511.jpg';

  return (
<div className="relative bg-cover bg-center flex flex-col items-center justify-center mt-0 w-full h-min opacity-95">
  <div className="relative">
    <img src={imageSrc} alt="Description of the image" className="rounded-sm shadow-2xl w-full h-auto" />

    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-30 p-4 sm:mr-0 sm:mb-4 md:mr-10 md:mb-6 lg:mr-16 xl:mr-20 xl:mb-8">
      <h1 className="font-semibold text-indigo-950 text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl select-none">Online English Tutor</h1>
      <p className="mt-2 text-gray-800 hidden sm:block md:block lg:block xl:block 2xl:block text-sm sm:text-md md:text-lg lg:text-base xl:text-xl select-none">Private online sessions with native English speakers</p>
      <p className="mt-6 text-gray-700 text-sm hidden sm:text-lg md:text-xl lg:text-lg xl:text-xl select-none">Book your online English tutoring session today and improve your language skills from the comfort of your home.</p>
      {/* <button className="mt-8 ml-28 bg-indigo-900 hover:bg-indigo-600 sm:block md:block lg:block xl:block 2xl:block hidden text-white py-3 px-6 rounded-full font-semibold text-lg focus:outline-none">Book Now</button> */}
    </div>

  </div>
</div>


   
  );
}

export default Hero;
