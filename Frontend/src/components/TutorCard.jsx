import React from 'react'

function TutorCard(props) {
    const { name, country, state, imageUrl,onDetail } = props;

  return (
   <div className="w-72 rounded-lg overflow-hidden bg-stone-200 shadow-md mx-6 my-10 cursor-pointer hover:scale-105 duration-700 hover:shadow-2xl hover:shadow-neutral-200 hover:bg-white" onClick={onDetail}>
      <img className="w-full h-48" src={imageUrl} alt="Tutor" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          Country: {country}<br />
          State: {state}
        </p>
      </div>
    </div>
  )
}

export default TutorCard
