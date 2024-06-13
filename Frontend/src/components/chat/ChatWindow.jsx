import React, { useState,useEffect,useRef } from "react";
import imageSrc from '../../assets/images/profileuser.jpg'
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleString(undefined, options);
  };
  
const ChatWindow = ({ selectedUser, messages, onSendMessage }) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");   
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedUser, messages]);

  return (
    <>
      {!selectedUser ? (
        <div className="flex justify-center items-center w-full h-screen ">
          <p className="font-semibold text-gray-800 px-4 py-2 w-96 bg-gray-100 rounded-full">
            Choose someone to have a chat with and send and receive messages and connect with your favourite tutors around the world on your palm
          </p>
          <img src=""/>
        </div>
      ) : (
        <div className="w-3/4 h-full flex flex-col pt-28 px-5">
          <div className="bg-gray-300 rounded-md flex sticky top-28 ">
            <img
              src={selectedUser.profile_image ?selectedUser.profile_image:imageSrc}
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
                className={`p-2 my-2 ${
                  message.sender === selectedUser.id ? "text-left" : "text-right"
                }`}
              >
                <p
                  className={`inline-block p-2 rounded-lg max-w-xs break-words ${
                    message.sender === selectedUser.id
                      ? "bg-blue-600 text-white"
                      : "bg-indigo-800 text-white font-normal"
                  }`}
                >
                  {message.content}
                </p>
                <p className="font-extralight text-sm">{formatTimestamp(message.timestamp)}</p>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef}/>
          <div className="p-4 bg-gray-300 rounded-md flex-none flex sticky bottom-1">
            <input
              type="text"
              className="w-full p-2 border rounded-lg "
              placeholder="Type a message..."
              value={message}
              onChange={handleInputChange}
            />
            <button
              className="ml-2 p-2 bg-indigo-800 text-white rounded-lg"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWindow;
