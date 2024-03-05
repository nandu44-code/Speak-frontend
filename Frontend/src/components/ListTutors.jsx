import React, { useEffect, useState } from "react";
import api from "../services/Axios";

function ListTutors() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await api.get("users/");
          if (response.status === 200) {
            console.log("Fetched all the users");
            console.log(response.data);
            setUsers(response.data);
          }
        } catch (error) {
          console.log("Error:", error);
        }
      };
  
      fetchUsers();
    }, []);
  
    const blockOrUnblockUser = async (id, isBlocked) => {
      try {
        const response = await api.patch(`users/${id}/`, { is_active: !isBlocked });
        if (response.status === 200) {
          const updatedUsers = users.map(user => {
            if (user.id === id) {
              return { ...user, is_active: !isBlocked };
            }
            return user;
          });
          setUsers(updatedUsers);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
  return (
    <div>
    <div className="ml-56 mt-20">
      <h1 className="text-2xl font-medium text-red-400 mb-10">Tutors</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-5">ID</th>
              <th className="px-20 py-5">Name</th>
              <th className="px-20 py-5">Email</th>
              <th className="px-20 py-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              (user.is_tutor && user.is_approved)? (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">{user.id}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.username}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-400 px-4 py-2">

                  {user.is_active ? <button className='bg-red-700 p-2 m-2 font-bold rounded text-white' onClick={() => blockOrUnblockUser(user.id, user.is_active)}
                    >Block </button>: <button
                    className='bg-green-600 p-2 m-2 rounded text-white font-bold'
                    onClick={() => blockOrUnblockUser(user.id, user.is_active)}
                  >UnBlock</button>}
                  <button className="bg-blue-900 p-2 m-2 rounded font-bold text-white hover:bg-blue-800" onClick={''}>View Details</button>
                  </td>
                </tr>
              ) : null
            ))}
          </tbody>
        </table>
      </div>
    </div>      
    </div>
  )
}

export default ListTutors
