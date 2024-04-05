import React from 'react';
import imageSrc from '../assets/images/pexels-andrea-piacquadio-3772511.jpg';
import heroimage1 from '../assets/images/heroimage1.jpg'
import heroimage2 from '../assets/images/heroimage2.jpg'

function Hero() {
  const backgroundImageUrl = '/assets/images/pexels-andrea-piacquadio-3772511.jpg';

  return (
<div className="relative bg-cover bg-center flex flex-row-reverse items-center justify-center mt-0 w-full h-min opacity-95">
  <div className="relative flex flex-col justify-center items-center w-full h-full lg:w-1/2">
    <h1 className="font-semibold text-indigo-900 text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-7xl select-none">Online English Tutor</h1>
    <p className="mt-2 text-gray-800 text-sm sm:text-md md:text-lg lg:text-base xl:text-xl select-none">Private online sessions with native English speakers</p>
    {/* <button className="mt-8 bg-indigo-900 hover:bg-indigo-600 text-white py-3 px-6 rounded-full font-semibold text-lg focus:outline-none">Book Now</button> */}
  </div>
  <div className="flex flex-col justify-between w-full h-full lg:w-1/2 lg:flex-row lg:flex-wrap">
    <div className="relative w-1/3 h-1/3 m-4">
      <img src={imageSrc} alt="Description of the image" className="rounded-sm shadow-2xl w-full h-full" />
    </div>
    <div className="relative w-1/2 h-1/2 m-2 rounded-lg">
      <img src={heroimage1} alt="Description of the image" className="rounded-sm shadow-2xl w-full h-full" />
    </div>
    <div className="relative w-1/2 h-1/2 m-4">
      <img src={heroimage2} alt="Description of the image" className="rounded-sm shadow-2xl w-full h-1/2" />
    </div>
    <div className="relative w-1/3 h-1/2 m-4">
      <img src={imageSrc} alt="Description of the image" className="rounded-sm shadow-2xl w-full h-full" />
    </div>
  </div>
</div>


   
  );
}

export default Hero;
