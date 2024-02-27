import React from "react";
import ListUsers from "../components/ListUsers";
import Sidebar from "../components/SideBar";
import Navbar from "../components/Navbar";
function AdminUsersPage() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <ListUsers />
      </div>
    </>
  );
}

export default AdminUsersPage;
