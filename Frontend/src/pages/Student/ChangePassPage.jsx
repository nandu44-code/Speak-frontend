import React from 'react'
import ChangePass from '../../components/ChangePass'
import StudentProfileSidebar from '../../components/StudentProfileSidebar'
import Navbar from '../../components/Navbar'

function ChangePassPage() {
  return (
    <div>
        <Navbar />
      <div className="flex">
        <StudentProfileSidebar/>
        <div className='ml-72 mt-20'>

        <ChangePass/>

        </div>
      
      </div>
       
    </div>
  )
}

export default ChangePassPage
