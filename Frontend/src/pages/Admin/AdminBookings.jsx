import React from 'react'
import Sidebar from '../../components/SideBar'
import ListBookings from '../../components/ListBookings'

function AdminBookings() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <ListBookings />
      </div>
    </>
  )
}

export default AdminBookings
