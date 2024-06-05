import React from "react";

const UserList = ({ users, onSelectUser }) => {
  return (
    <div className="w-1/4 border-r border-gray-300 h-screen overflow-y-auto pt-20">
      <input
        type="search"
        className="m-10 p-5 bg-gray-200 font-semibold text-black rounded-md"
        placeholder="Search users"
      />
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="p-4 hover:bg-gray-200 cursor-pointer"
            onClick={() => onSelectUser(user)}
          >
            <div className="flex gap-3">
              <img
                src="https://media.istockphoto.com/id/1486287149/photo/group-of-multiracial-asian-business-participants-casual-chat-after-successful-conference-event.jpg?s=1024x1024&w=is&k=20&c=3IFYpgorUA9326qw3vLib5M-4jEobA_ck3Wromjyyb0="
                className="w-10 h-10 rounded-full"
              />
              <p className='mr-10 font-bold text-gray-700'>{user.name}</p>
              <p className="font-thin text-sm">{user.last_message}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
