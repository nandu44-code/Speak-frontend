import React from 'react';
import imageSrc from '../assets/images/pexels-andrea-piacquadio-3772511.jpg';

function Header() {
  const backgroundImageUrl = '/assets/images/pexels-andrea-piacquadio-3772511.jpg';

  return (
<header className="relative bg-cover bg-center flex flex-col items-center justify-center mt-0 w-full opacity-95 hover:scale-x-95 duration-1000">
 <div className="relative">
    <img src={imageSrc} alt="Description of the image" className="rounded-sm shadow-2xl w-full" />

    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-30 p-4 sm:mr-0 sm:mb-4 md:mr-10 md:mb-6 lg:mr-16 xl:mr-20 xl:mb-8">
  <h1 class="font-semibold text-indigo-950 text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl select-none">Online English Tutor</h1>
  <p class="mt-2 text-gray-800 hidden sm:block md:block lg:block xl:block 2xl:block text-base md:text-lg lg:text-base xl:text-xl select-none">Private online sessions with native English speakers</p>
</div>

 </div>
</header>

   
  );
}

export default Header;
