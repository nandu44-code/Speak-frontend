import React, { useEffect, useState } from "react";
import UserList from "../../components/chat/Userlist";
import ChatWindow from "../../components/chat/ChatWindow";
import Navbar from "../../components/Navbar";
import jwtDecode from "jwt-decode";  // Remove curly braces around jwtDecode
import api from "../../services/Axios";

function ChatPage() {
  const [users, setUsers] = useState([]);  // Initialize as an empty array
  const [selectedUser, setSelectedUser] = useState(null);  // Initialize as null

  const [messages] = useState([
    { from: 1, content: "Hello from User 1" },
    { from: 2, content: "Hi from User 2" },
    { from: 2, content: "Hi from User 2" },
    // Add more messages here
  ]);

  console.log(selectedUser, 'selectedUser');

  const access = jwtDecode(localStorage.getItem('accessToken'));
  const sender_id = access.user;

  useEffect(() => {
    const fetch_receivers = async () => {
      const response = await api.get(`message/chat/receivers/${sender_id}/`);
      console.log(response.data);
      setUsers(response.data.results);
    };

    fetch_receivers();
  }, [sender_id]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <Navbar />
      </div>
      <div className="flex flex-1">
        <UserList users={users} onSelectUser={setSelectedUser} />
        <ChatWindow
          selectedUser={selectedUser}
          messages={selectedUser ? messages.filter((msg) => msg.from === selectedUser.id) : []}
        />
      </div>
    </div>
  );
}

export default ChatPage;
