import React from "react";
import { BiSolidMessageAltError } from "react-icons/bi";
import Navbar from "../../components/Navbar";

function RejectedPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-full">
        <BiSolidMessageAltError
          color="indigo"
          size={50}
          className="mt-10 justify-center"
        />
        <h1 className="font-bold text-2xl text-red-700 mt-6">
          Your Application is rejected by Admin
        </h1>
      </div>
    </>
  );
}

export default RejectedPage;
