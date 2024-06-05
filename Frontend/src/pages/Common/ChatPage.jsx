import React, { useState } from "react";
import UserList from "../../components/chat/Userlist";
import ChatWindow from "../../components/chat/ChatWindow";
import Navbar from "../../components/Navbar";

function ChatPage() {
  const [users] = useState([
    { id: 1, name: "Athiwh", last_message: "8/12/24" },
    { id: 2, name: "Jaya krishnan", last_message: "6/2/24" },
    // Add more users here
  ]);

  const [messages] = useState([
    { from: 1, content: "Hello from User 1" },
    { from: 2, content: "Hi from User 2" },
    { from: 2, content: "Hi from User 2" },
    // Add more messages here
  ]);

  const [selectedUser, setSelectedUser] = useState(users[0]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <Navbar />
      </div>
      <div className="flex flex-1">
        <UserList users={users} onSelectUser={setSelectedUser} />
        <ChatWindow
          selectedUser={selectedUser}
          messages={messages.filter((msg) => msg.from === selectedUser.id)}
        />
      </div>
    </div>
  );
}

export default ChatPage;
