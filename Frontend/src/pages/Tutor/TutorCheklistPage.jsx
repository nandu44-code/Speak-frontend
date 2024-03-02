import React from "react";
import TutorSignupsidebar from "../../components/tutor/TutorSignupsidebar";
import TutorBasicDetails from "../../components/tutor/TutorBasicDetails";

function TutorCheklistPage() {
  return (
    <div>
      <div className="ml-72">
        <h5 className="font-semibold text-sky-900 text-3xl mt-7 mb-2">
          Fill Up Your Details
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
