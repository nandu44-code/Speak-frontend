// Header.js
import React from 'react';
import imageSrc from '../assets/images/pexels-andrea-piacquadio-3772511.jpg';

function Header(){
    const backgroundImageUrl = '/assets/images/pexels-andrea-piacquadio-3772511.jpg';
  return (
    <header
    className="bg-cover bg-center flex flex-col items-center justify-center mt-0 w-full opacity-80">
    <h1 className="text-black text-4xl font-bold"></h1>
    <div>
    <img src={imageSrc} alt="Description of the image" className="rounded-sm shadow-2xl w-full "/>
    {/* <div className="absolute inset-0 ">
      <h1>Find tutors availble Online</h1>
    </div> */}
    <div>
      <h1 className='text-7xl z-30'>hi there </h1>
    </div>
    </div>
  </header>
  );
};

export default Header;
