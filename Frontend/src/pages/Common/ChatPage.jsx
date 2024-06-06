import React, { useEffect, useState } from "react";
import UserList from "../../components/chat/Userlist";
import ChatWindow from "../../components/chat/ChatWindow";
import Navbar from "../../components/Navbar";
import {jwtDecode} from "jwt-decode";  
import api from "../../services/Axios";

function ChatPage() {
  const [users, setUsers] = useState([]);  
  const [selectedUser, setSelectedUser] = useState(null); 
  const [socket,setSocket] = useState(null)
  const [messages] = useState([]);

  const access = jwtDecode(localStorage.getItem('accessToken'));
  const sender_id = access.user;

  const handleUserSelect = async (user) => {
    setSelectedUser(user)
    console.log(user,'this is the user yo')
    const receiver_id = user.id
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${sender_id}/${receiver_id}/`)
    setSocket(ws)

    ws.onopen = () => { 
        console.log('websocket connected') 
    }

    ws.onmessage = (event) => {
        console.log("Message received:", event.data);
      };
    ws.onclose = () => {
        console.log("WebSocket disconnected");
      };
  }

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
        <UserList users={users} onSelectUser={handleUserSelect} />
        <ChatWindow
          selectedUser={selectedUser}
          messages={selectedUser ? messages.filter((msg) => msg.from === selectedUser.id) : []}
        />
      </div>
    </div>
  );
}

export default ChatPage;
