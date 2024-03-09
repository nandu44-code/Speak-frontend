import React, { useEffect, useState } from "react";
import api from "../services/Axios";

function ListUsers() {
  const [users, setUsers] = useState([]);
  let id = 0
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
    <div className="ml-56 mt-20">
      <h1 className="text-2xl font-medium text-red-400 mb-10">Users</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-5">ID</th>
              <th className="px-20 py-5">Username</th>
              <th className="px-20 py-5">First Name</th>
              <th className="px-20 py-5">Last Name</th>
              <th className="px-20 py-5">Email</th>
              <th className="px-20 py-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              user.is_student ? (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">{++id}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.username}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.first_name}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.last_name}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-400 px-4 py-2">
                    
                  {user.is_active ? <button className='bg-red-700 p-2 m-2 font-bold rounded text-white' onClick={() => blockOrUnblockUser(user.id, user.is_active)}
                    >block </button>: <button
                    className='bg-green-400 p-2 m-2'
                    onClick={() => blockOrUnblockUser(user.id, user.is_active)}
                  >unblock</button>}
                    
                  </td>
                </tr>
              ) : null
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListUsers;
