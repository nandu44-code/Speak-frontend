import React, { useEffect, useState } from "react";
import api from "../services/Axios";
import { useNavigate } from "react-router-dom";

function ListTutors() {
    const [users, setUsers] = useState([]);
    const [searchTerm,setSearchTerm] = useState('')
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [id,setId] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await api.get("tutors/");
          if (response.status === 200) {
            console.log("Fetched all the tutors");
            console.log(response.data);
            setUsers(response.data);
          }
        } catch (error) {
          console.log("Error:", error);
        }
      };
  
      fetchUsers();
    }, [page]);

    const handlePageChange = (page) => {
      setPage(page);
    };
  
  
    const blockOrUnblockUser = async (id, isBlocked) => {
      try {
        const response = await api.patch(`tutorlist/${id}/`, { is_active: !isBlocked });
        if (response.status === 200) {
          console.log('response status of the blocking is 200', response)
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


    useEffect(() => {
      if (id != null){
          navigate(`/admin/tutors/detail/${id}`)
      }
    },[id])

    const searchUsers = async (e) => {
      const searchTerm = e.target.value;
      setSearchTerm(searchTerm);
      
      try {
        setLoading(true);
        if (searchTerm.trim() !== "") {
          const response = await api.get(`tutor-search/?search=${searchTerm}`);
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
    <div>
    <div className="ml-56 mt-20">
      <h1 className="text-2xl font-medium text-red-400 mb-10">Tutors</h1>
      <div className="overflow-x-auto">
      <input
        type="search"
        placeholder="search..."
        className="rounded-full 2xl:w-96 w-56 placeholder-indigo-950 placeholder:font-bold px-4 py-2 mb-5 focus:bg-white bg-stone-200"
        onChange={searchUsers}
        value={searchTerm}
      /> 
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
            {users.map((user, index) => ((
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">{user.id}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.username}</td>
                  <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-400 px-4 py-2">

                  {user.is_active ? (<button className='bg-red-700 p-2 m-2 font-bold rounded text-white' onClick={() => blockOrUnblockUser(user.id, user.is_active)}
                    >Block </button>)
                    :( <button
                    className='bg-green-600 p-2 m-2 rounded text-white font-bold'
                    onClick={() => blockOrUnblockUser(user.id, user.is_active)}
                  >UnBlock</button>)
                  }
                  <button className="bg-blue-900 p-2 m-2 rounded font-bold text-white hover:bg-blue-800" onClick={() =>{setId(user.id)}}>View Details</button>
                  </td>
                </tr>
              ) 
            ))}
          </tbody>
        </table>
      </div>
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
  )
}

export default ListTutors
