import React from 'react'
import TutorSignupsidebar from '../components/tutor/TutorSignupsidebar';

function TutorCheklistPage() {
  return (
    <div>
        <h5 className='font-bold text-sky-900 text-4xl mt-7 shadow-lg'>Speak Tutor profile</h5>
        <p className='font-medium mt-4'>Your tutor profile is  your chance to market yourself to students on speakiko. You can make edit changes on your profile later.
            New students may browse tutor profiles to find a tutor that fits their learning goals personally.
        </p>    
          <TutorSignupsidebar/>
    </div>
  )
}

export default TutorCheklistPage
