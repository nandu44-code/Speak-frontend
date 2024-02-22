import React from 'react';
import imageSrc from '../assets/images/pexels-andrea-piacquadio-3772511.jpg';

function Header() {
  const backgroundImageUrl = '/assets/images/pexels-andrea-piacquadio-3772511.jpg';

  return (
    <header className="relative bg-cover bg-center flex flex-col items-center justify-center mt-0 w-full opacity-80">
      <h1 className="text-black text-4xl font-bold"></h1>

      <div className="relative">
        <img src={imageSrc} alt="Description of the image" className="rounded-sm shadow-2xl w-full" />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-30 p-4 mr-48">
          <h1 className="text-9xl font-semibold text-indigo-950 mr-90 flex flex-row">Online Engllish Tutor</h1>
          <p className='text-3xl mr-0'>Private online session with native English speakers</p>
          
        </div>
      </div>
    </header>
  );
}

export default Header;
