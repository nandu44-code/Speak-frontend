import React,{useState,useEffect} from 'react';
import imageSrc from '../assets/images/pexels-andrea-piacquadio-3772511.jpg';
import heroimage1 from '../assets/images/heroimage1.jpg'
import heroimage2 from '../assets/images/heroimage2.jpg'
import heroimage3 from '../assets/images/heroimage3.jpg'
import heroimage4 from '../assets/images/heroimage4.jpg'

function Hero() {
  const backgroundImageUrl = '/assets/images/pexels-andrea-piacquadio-3772511.jpg';
  const [colorIndex, setColorIndex] = useState(0);

  const colors = [ 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  'linear-gradient(45deg, #00CED1 30%, #4682B4 90%)',]; // Add more colors as needed

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 990); 


    return () => clearInterval(intervalId);
  }, []); 

  return (
<div className="relative bg-cover bg-dark flex flex-row-reverse items-center justify-center mt-0 w-full h-min opacity-90">
  <div className="relative flex flex-col justify-center items-center w-full h-full lg:w-1/2 rounded-2xl p-10 leading-tight">
    <h1 className="font-medium text-indigo-900 text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-7xl select-none font-serif">Online English Tutor Available Right Now!!!</h1>
    <p className="mt-5 text-gray-700 text-sm sm:text-md md:text-lg lg:text-base xl:text-xl select-none font-medium font-serif">Private online sessions with native English speakers</p>
    <button className="mt-8 bg-indigo-900 hover:bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg focus:outline-none animate-bounce" style={{ background: colors[colorIndex]}}>Book Now</button>
  </div>
  <div className="flex flex-col justify-center w-full h-full lg:w-1/2 lg:flex-row lg:flex-wrap">
  <div className="relative w-1/4 h-1/4 m-4 rounded-2xl">
      <img src={heroimage3} alt="Description of the image" className="rounded-sm shadow-2xl w-full h-full" />
    </div>
    <div className="relative w-1/2 h-1/2 m-4 rounded-2xl" data-aos="zoom-out-right">
      <img src={heroimage1} alt="Description of the image" className="rounded-sm shadow-2xl w-full h-full" />
    </div>
    <div className="relative w-1/2 h-1/2 m-4 rounded-2xl">
      <img src={heroimage2} alt="Description of the image" className="rounded-sm shadow-2xl w-full h-1/2" />
    </div>
    <div className="relative w-1/4 h-1/4 m-4 rounded-2xl">
      <img src={heroimage4} alt="Description of the image" className="rounded-sm shadow-2xl w-full h-full" />
    </div>
  </div>
</div>


   
  );
}

export default Hero;
