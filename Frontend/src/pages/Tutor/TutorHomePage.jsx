import React from 'react'
import TutorSidebar from '../../components/tutor/TutorSidebar'

function TutorHomePage() {




  return (
    <div className='flex flex-row'>
        
        <TutorSidebar/>

      <div className='w-1/6 shadow-md shadow-black h-48 mx-20 my-20'>
        <p className='font-bold text-2xl text-gray-800'>Completed Sessions</p>
      </div>
      <div className='w-1/6 shadow-md shadow-black h-48 mx-20 my-20'>
        <p className='font-bold text-2xl text-gray-800'>Pending Sessions</p>
      </div>
      <div className='w-1/6 shadow-md shadow-black h-48 mx-20 my-20'>
        <p className='font-bold text-2xl text-gray-800'>Approved sessions</p>

      </div>
     
    </div>
  )
}

export default TutorHomePage
