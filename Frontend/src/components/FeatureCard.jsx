import React from 'react';

const CustomCard = ({ icon, heading, paragraph }) => {
  return (
    <div className="w-full bg-slate-300 rounded-xl p-5 m-2 hover:scale-105 hover:border-b-4 border-indigo-900  duration-700 hover:rounded-3xl cursor-pointer 
                    sm:w-5/6 md:w-3/4 lg:w-1/4 xl:w-1/4 2xl:w-1/4 ">
      <div className="flex flex-row">
        {icon && React.cloneElement(icon, { size: '4rem' })}
        <h1 className="m-4 font-bold text-xl lg:text-2xl text-purple-800">{heading}</h1>
      </div>
      <p className="text-gray-500 font-medium hidden sm:block md:block lg:block xl:block 2xl:block">{paragraph}</p>
    </div>
  );
};

export default CustomCard;
