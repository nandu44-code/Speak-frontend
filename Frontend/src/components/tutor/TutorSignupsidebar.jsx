import React from "react";

function TutorSignupsidebar() {
  return (
    <div className="flex-col w-1/6 h-screen mt-4">
      <button className="bg-sky-800 p-2 rounded-md text-white mb-4">
        Become a speak tutor
      </button>

      <h1 className="text-xl font-bold text-indigo-900">
        Your SignUp checklist
      </h1>
      <div className="flex flex-col mt-10">
        <button className="bg-stone-400 p-2 rounded-md font-medium mb-10 ml-2 text-gray-100 hover:bg-stone-300 hover:text-black hover:scale-110 duration-300">speak profile</button>

        <button className="bg-stone-400 p-2 rounded-md text-gray-100 hover:bg-stone-300 hover:text-black font-medium mb-10 ml-2">connection testing</button>
      </div>
    </div>
  );
}

export default TutorSignupsidebar;
