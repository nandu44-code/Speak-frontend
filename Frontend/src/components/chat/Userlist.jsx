import React from "react";

const UserList = ({ users, onSelectUser }) => {
  return (
    <div className="w-1/4 bg-shadow-lg shadow-black h-screen overflow-y-auto pt-20 sticky top-0 mr-2">
      <input
        type="search"
        className=" flex m-10 p-5 bg-gray-200 font-semibold text-black rounded-md"
        placeholder="Search users"
      />
      <ul>
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map((user) => (
            <li
              key={user.id}
              className="p-4 hover:bg-gray-200 cursor-pointer"
              onClick={() => onSelectUser(user)}
            >
              <div className="flex gap-3">
                <img
                  src={user.profile_image}
                  className="w-10 h-10 rounded-full"
                  alt={user.username}
                />
                <p className="mr-10 font-bold text-gray-700">{user.username}</p>
                <p className="font-thin text-sm">{user.last_message}</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserList;
