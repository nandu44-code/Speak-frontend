import React from "react";
import TutorSignupsidebar from "../components/tutor/TutorSignupsidebar";
import TutorBasicDetails from "../components/tutor/TutorBasicDetails";
function TutorCheklistPage() {
  return (
    <div>
      <div>
      <h5 className="font-bold text-sky-900 text-4xl mt-7 shadow-lg">
          Speak Tutor profile
        </h5>
      </div>
      <div className="flex flex-row">
        <TutorSignupsidebar />
        <TutorBasicDetails />
      </div>
    </div>
  );
}

export default TutorCheklistPage;
