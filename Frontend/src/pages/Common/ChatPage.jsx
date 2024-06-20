import React, { useEffect, useState } from "react";
import UserList from "../../components/chat/Userlist";
import ChatWindow from "../../components/chat/ChatWindow";
import Navbar from "../../components/Navbar";
import { jwtDecode } from "jwt-decode";  
import api from "../../services/Axios";

function ChatPage() {
  const [users, setUsers] = useState([]);  
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const access = jwtDecode(localStorage.getItem('accessToken'));
  const sender_id = access.user;

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    fetchMessages(user.id);
    const receiver_id = user.id;
    print(receiver_id)

    const ws = new WebSocket(`ws://localhost:8001/ws/chat/${sender_id}/${receiver_id}/`);
    setSocket(ws);
    console.log(ws)
    ws.onopen = () => { 
        console.log('WebSocket connected'); 
    }; 

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("Message received:", message);

        const normalizedMessage = {
            id: Date.now(),
            content: message.message,
            sender: message.sender,
            receiver: receiver_id,
            timestamp: new Date().toISOString()
        };

        setMessages((prevMessages) => [...prevMessages, normalizedMessage]);
    };

    ws.onclose = () => {
        console.log("WebSocket disconnected");
    };
  };

  const fetchMessages = async (receiver_id) => {
    const response = await api.get(`message/chat/messages/${sender_id}/${receiver_id}/`);
    setMessages(response.data);
    console.log(response.data, 'these are the messages');
  };

  const handleSendMessage = (messageContent) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = {
        message: messageContent,
      };

      socket.send(JSON.stringify(message));

    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    console.log(query,'from chatpage')

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const response = await api.get(`chat-search/?search=${query}`);
      console.log(response.data,'response froom the api search')
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
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
    <div className="flex flex-col h-screen w-full">
      {access.is_student ? (
        <div className="flex-none">
          <Navbar />
        </div>
      ) : null}
      <div className="flex flex-1">
        <UserList
          users={users}
          searchResults={searchResults}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          onSelectUser={handleUserSelect}
        />
        <div className="flex flex-col flex-1">
          <ChatWindow
            selectedUser={selectedUser}
            messages={messages}
            onSendMessage={handleSendMessage} // Pass the handleSendMessage function as a prop
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
