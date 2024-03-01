import React from 'react'
import ListTutors from '../components/ListTutors'
import Navbar from '../components/Navbar'
import Sidebar from '../components/SideBar'

function AdminTutorsPage() {
  return (
    <>
    <Navbar />
    <div className="flex">
      <Sidebar />
      <ListTutors />
    </div>
  </>
  )
}

export default AdminTutorsPage
