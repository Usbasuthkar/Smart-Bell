import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../Components/Header";
import ChatSidebar from "./components/ChatSidebar";
import ChatWindow from "./components/ChatWindow";
import "./styles/Chat.css"

export default function Chat() {
  const { email } = useParams();
  const [activeChat, setActiveChat] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    setTimeout(() => {
      setContacts([
        {
          id: "1",
          name: "John Smith",
          avatar: "/user.png",
          userType: "investor",
          lastMessage: "I'm interested in your AI startup project",
          time: "10:30 AM",
          unread: 2,
        },
        {
          id: "2",
          name: "Sarah Johnson",
          avatar: "/user.png",
          userType: "client",
          lastMessage: "Can you provide more details about the funding?",
          time: "Yesterday",
          unread: 0,
        },
        {
          id: "3",
          name: "Michael Brown",
          avatar: "/user.png",
          userType: "investor",
          lastMessage: "Let's schedule a call to discuss the terms",
          time: "Monday",
          unread: 1,
        },
        {
          id: "4",
          name: "Emma Wilson",
          avatar: "/user.png",
          userType: "client",
          lastMessage: "Thank you for your interest in my project",
          time: "2 days ago",
          unread: 0,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleChatSelect = (contactId) => {
    setActiveChat(contactId);
    // Mark messages as read when chat is selected
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === contactId ? {...contact, unread: 0} : contact
      )
    );
  };

  return (
    <div className="chat-page">
      <Header email={email} />
      <div className="chat-container">
        <ChatSidebar 
          contacts={contacts} 
          activeChat={activeChat} 
          onChatSelect={handleChatSelect}
          loading={loading}
        />
        <ChatWindow 
          activeChat={activeChat} 
          contacts={contacts}
          currentUserEmail={email}
        />
      </div>
    </div>
  );
}