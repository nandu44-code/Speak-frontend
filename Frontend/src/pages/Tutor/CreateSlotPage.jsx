import React from "react";
import TutorSidebar from "../../components/tutor/TutorSidebar";
import CreateSlotForm from "../../components/tutor/CreateSlotForm";

function CreateSlotPage() {
  return (
    <div className="flex">
      <TutorSidebar />
      <div className="flex justify-center items-center px-44 w-full mt-20 ml-64">
        <CreateSlotForm />
      </div>
    </div>
  );
}

export default CreateSlotPage;
