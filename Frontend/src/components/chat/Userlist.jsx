import React from "react";
import imageSrc from '../../assets/images/profileuser.jpg'
const UserList = ({ users = [], searchResults = [], searchQuery, onSearch, onSelectUser }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
    console.log(e.target.value, 'from userlist');
  };

  const usersToDisplay = searchQuery ? searchResults : users;

  return (
    <div className="w-1/4 bg-shadow-lg shadow-black h-screen overflow-y-auto pt-20 sticky top-0 mr-2">
      <input
        type="search"
        value={searchQuery}
        onChange={handleSearchChange}
        className="flex m-10 px-4 py-2 bg-gray-200 font-semibold text-black rounded-md"
        placeholder="Search users"
      />
      <ul>
        {usersToDisplay.length === 0 ? (
          <p>No users found</p>
        ) : (
          
          usersToDisplay.map((user) => (
            <li
              key={user.id}
              className="p-4 hover:bg-gray-200 cursor-pointer bg-gray-100 rounded-md mb-2 mx-2"
              onClick={() => onSelectUser(user)}
            >
            
              <div className="flex gap-3">
                <img
                  src={user.profile_image?user.profile_image:imageSrc}
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
