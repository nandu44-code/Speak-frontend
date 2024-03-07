import React from "react";

const FeatureCard = ({ icon, heading, paragraph }) => {
  return (
    <div className="flex flex-col w-1/5 bg-slate-200 rounded-xl p-5">
      <div className="flex flex-row">
        {icon && React.cloneElement(icon, { size: 80, color: 'purple' })}
        <h1 className="m-4 font-bold text-xl text-purple-800">{heading}</h1>
      </div>
      <p className="text-gray-600">{paragraph}</p>
    </div>
  );
};

export default FeatureCard;
