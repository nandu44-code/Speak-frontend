import React, { useEffect, useState } from "react";
import api from "../services/Axios";

function ListUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("users/");
        if (response.status === 200) {
          console.log("Fetched all the users");
          console.log(response.data);
          // const studentUsers = response.data.filter(user => user.is_student);
          setUsers(response.data);
          // console.log(users)
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    console.log(users); // This will log the updated users state
  }, [users]);


  const blockuser = async (id) => {
    try{
        const credentials={
            is_active:false
        }

        const response = await api.patch(`users/${id}/`,credentials);

    }catch(error){
        console.log("error,",error)
    }
  }

  const unblockuser = async (id) => {
    try{
        const credentials={
            is_active:true
        }

        const response = await api.patch(`users/${id}/`,credentials);

    }catch(error){
        console.log("error,",error)
    }
  }
  return (
    <div className="ml-56 mt-20">
      <h1 className="text-2xl font-medium text-red-400 mb-10">Users</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
             user.is_student?
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">
                {index+1}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {user.username}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                {user.is_active?<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => blockuser(user.id)}>
                    Block
                  </button>:
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => unblockuser(user.id)}>
                  Un block
                </button>}
                  
                </td>
              </tr>
              :null
            ))}
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListUsers;
