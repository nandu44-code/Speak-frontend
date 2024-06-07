import React, { useEffect, useState } from "react";
import api from "../services/Axios";

function  ListUsers() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm,setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  let id = 0;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`users/?page=${page}`);
        if (response.status === 200) {
          console.log("Fetched all the users");
          console.log(response.data);
          setUsers(response.data.results);
          setTotalPages(response.data.count);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchUsers();
  }, [page]);

  const blockOrUnblockUser = async (id, isBlocked) => {
    try {
      const response = await api.patch(`users/${id}/`, {
        is_active: !isBlocked,
      });
      if (response.status === 200) {
        const updatedUsers = users.map((user) => {
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

    const handlePageChange = (page) => {
      setPage(page);
    };

  const searchUsers = async (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    
    try {
      setLoading(true);
      if (searchTerm.trim() !== "") {
        const response = await api.get(`user-search/?search=${searchTerm}`);
        console.log(response.data)
        setUsers(response.data.results);
      } else {
        try {
          const response = await api.get(`/users/page=${page}`);
          if (response.status === 200) {
            console.log("Fetched all the users");
            console.log(response.data);
            setUsers(response.data);
          }
        } catch (error) {
          console.log("Error:", error);
        }
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-10 mt-20">
      <div className="overflow-x-auto">
      <input
        type="search"
        placeholder="search..."
        className="rounded-full 2xl:w-96 w-56 placeholder-indigo-950 placeholder:font-bold px-4 py-2 mb-5 focus:bg-white bg-stone-200"
        onChange={searchUsers}
        value={searchTerm}
      /> 
        <table className="table-auto border-collapse hover:table-fixed bg-gray-700">
          <caption class="caption-top mb-4 text-2xl font-bold text-gray-600">
            Users
          </caption>
          <thead className="rounded-lg">
            <tr className=" bg-gray-300 divide-x-2">
              <th className="px-4 py-5 text-gray-600">SI.NO</th>
              <th className="px-20 py-5 text-gray-600">Username</th>
              <th className="px-20 py-5 text-gray-600">First Name</th>
              <th className="px-20 py-5 text-gray-600">Last Name</th>
              <th className="px-20 py-5 text-gray-600">Email</th>
              <th className="px-20 py-5 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              // user.is_student ? (
              <tr key={index} className="hover:bg-gray-600 cursor-pointer">
                <td className="border border-gray-400 text-white px-4 py-2">{++id}</td>
                <td className="border border-gray-400 text-white px-4 py-2">
                  {user.username}
                </td>
                <td className="border border-gray-400 text-white px-4 py-2 text-lg">
                  {user.first_name}
                </td>
                <td className="border border-gray-400 text-white px-4 py-2 text-lg">
                  {user.last_name}
                </td>
                <td className="border border-gray-400 text-white px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-400 text-white px-4 py-2">
                  {user.is_active ? (
                    <button
                      className="bg-red-500 px-4 py-2 m-2 font-bold rounded text-white"
                      onClick={() =>
                        blockOrUnblockUser(user.id, user.is_active)
                      }
                    >
                     Block
                    </button>
                  ) : (
                    <button
                    className="bg-green-500 px-4 py-2 m-2 font-bold rounded text-white"
                      onClick={() =>
                        blockOrUnblockUser(user.id, user.is_active)
                      }
                    >
                      Unblock
                    </button>
                  )}
                </td>
              </tr>
              // ) : null
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-indigo-800 px-4 py-2 mx-4 text-white rounded-md cursor-pointer hover:bg-indigo-900"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="bg-indigo-800 px-4 py-2 mx-4 text-white rounded-md cursor-pointer hover:bg-indigo-900"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ListUsers;
