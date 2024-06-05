import React from 'react';

const ChatWindow = ({ selectedUser, messages }) => {
  return (
    <div className="w-3/4 h-screen flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`p-2 my-2 ${message.from === selectedUser.id ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${message.from === selectedUser.id ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-300">
        <input type="text" className="w-full p-2 border rounded-lg" placeholder="Type a message..." />
      </div>
    </div>
  );
};

export default ChatWindow;
