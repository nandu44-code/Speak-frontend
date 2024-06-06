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
  const [messages,setMessages] = useState([]);

  const access = jwtDecode(localStorage.getItem('accessToken'));
  const sender_id = access.user;

  const handleUserSelect = async (user) => {
    setSelectedUser(user)
    fetchMessages(user.id);
    const receiver_id = user.id
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${sender_id}/${receiver_id}/`)
    setSocket(ws)

    ws.onopen = () => { 
        console.log('websocket connected') 
    }

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("Message received:", message);
        
        // Normalize the message format
        const normalizedMessage = {
            id: Date.now(), // Temporary ID, you might want to change this
            content: message.message,
            sender: message.sender,
            receiver: receiver_id,
            timestamp: new Date().toISOString() // Use current time
        };

        setMessages((prevMessages) => [...prevMessages, normalizedMessage]);
    };
    ws.onclose = () => {
        console.log("WebSocket disconnected");
      };
  }

  const fetchMessages = async (receiver_id) => {
    const response = await api.get(`message/chat/messages/${sender_id}/${receiver_id}/`);
    setMessages(response.data.results);
    console.log(response.data.results,'this is the messages')
  };


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
          messages={messages}
        />
      </div>
    </div>
  );
}

export default ChatPage;
