import React from "react";
import TutorSidebar from "../../components/tutor/TutorSidebar";
import CreateSlotForm from "../../components/tutor/CreateSlotForm";

function CreateSlotPage() {
  return (
    <div className="flex">
      <TutorSidebar />
      <div className="mx-auto my-10 flex-grow">
        <CreateSlotForm />
      </div>
    </div>
  );
}

export default CreateSlotPage;
