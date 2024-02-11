// Header.js
import React from 'react';
import imageSrc from '../assets/images/pexels-andrea-piacquadio-3772511.jpg';

function Header(){
    const backgroundImageUrl = '/assets/images/pexels-andrea-piacquadio-3772511.jpg';
  return (
    <header
    className="bg-cover bg-center h-64 flex flex-col items-center justify-center mt-6"
    style={{ backgroundImage: `url(${backgroundImageUrl})` }}
  >
    <h1 className="text-black text-4xl font-bold">Your Website Name</h1>
    <img src={imageSrc} alt="Description of the image" className="rounded-sm shadow-2xl w-full"/>
  </header>
  );
};

export default Header;
