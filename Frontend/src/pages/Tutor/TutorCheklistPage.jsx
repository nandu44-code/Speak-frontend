import React from "react";
import TutorSignupsidebar from "../../components/tutor/TutorSignupsidebar";
import TutorBasicDetails from "../../components/tutor/TutorBasicDetails";
import Navbar from "../../components/Navbar";

function TutorCheklistPage() {
  return (
    <div>
      <Navbar/>
      <div className="ml-72 pt-20">
        <h5 className="font-semibold text-sky-900 text-3xl mt-7 mb-2">
          Fill Up Your Details
        </h5>
      </div>
      <div className="flex flex-row overflow-hidden">
        <TutorSignupsidebar />
        <TutorBasicDetails />
      </div>
    </div>
  );
}

export default TutorCheklistPage;
