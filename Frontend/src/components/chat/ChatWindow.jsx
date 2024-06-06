import React from "react";

const ChatWindow = ({ selectedUser, messages }) => {
  return (
    <>
      {!selectedUser ? (
        <div className="flex justify-center items-center w-full">
          <p className="font-normal text-gray-100 bg-stone-400 px-4 py-2">Choose someone to have a chat with</p>
        </div>
      ) : (
        <div className="w-3/4 h-full flex flex-col pt-28 px-5">
          <div className="bg-gray-300 rounded-sm flex">
            <img
              src={selectedUser.profile_image || ""}
              className="h-12 w-12 my-4 mx-2 rounded-full"
              alt={selectedUser.username}
            />
            <p className="my-4 mx-2 font-bold text-xl text-gray-800">
              {selectedUser.username}
            </p>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 my-2 ${message.from === selectedUser.id ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${message.from === selectedUser.id ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-300 flex-none">
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Type a message..."
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWindow;