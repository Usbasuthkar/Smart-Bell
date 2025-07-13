import React, { useState, useEffect, useRef } from "react";
import "../styles/ChatWindow.css";

export default function ChatWindow({ activeChat, contacts, currentUserId }) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const messageEndRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const activeContact = contacts.find(contact => contact.id === activeChat);

  // Mock data for chat messages - replace with actual API calls
  useEffect(() => {
    if (activeChat) {
      // Simulate loading messages for the selected contact
      const mockMessages = [
        {
          id: 1,
          sender: activeContact.id,
          text: "Hi there, I saw your project and I'm interested in learning more.",
          timestamp: "10:30 AM",
        },
        {
          id: 2,
          sender: "currentUser",
          text: "Hello! Thanks for reaching out. What specifically are you interested in?",
          timestamp: "10:32 AM",
        },
        {
          id: 3,
          sender: activeContact.id,
          text: "I'm particularly interested in the market analysis you've done. Could you share more details about your target audience?",
          timestamp: "10:35 AM",
        },
        {
          id: 4,
          sender: "currentUser",
          text: "Of course! Our primary target audience is small to medium businesses in the tech sector. We've conducted surveys with over 500 potential customers.",
          timestamp: "10:38 AM",
        },
        {
          id: 5,
          sender: activeContact.id,
          text: "That sounds promising. What kind of investment are you looking for?",
          timestamp: "10:40 AM",
        }
      ];
      setChatMessages(mockMessages);
    } else {
      setChatMessages([]);
    }
  }, [activeChat, activeContact]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    
    const newMessage = {
      id: Date.now(),
      sender: "currentUser",
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setMessage("");
  };

const toggleMenu = () => {
  setShowMenu(prev => !prev);
};

const handleOptionClick = (option) => {
  console.log(`${option} clicked`);
  setShowMenu(false); // Close menu after selection
};

  if (!activeChat) {
    return (
      <div className="chat-window empty-state">
        <div className="no-chat-selected">
          <div className="icon">💬</div>
          <h3>Select a conversation</h3>
          <p>Choose a contact from the list to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="contact-info">
          <img src={activeContact.avatar} alt={activeContact.name} className="contact-avatar" />
          <div className="contact-details">
            <h3>{activeContact.name}</h3>
            <span className={`user-badge ${activeContact.userType}`}>
              {activeContact.userType === "investor" ? "Investor" : "Client"}
            </span>
          </div>
        </div>
        <div className="chat-actions">
        <div className="dropdown-wrapper">
  <button className="action-button" onClick={toggleMenu}>
    <i className="icon">⋮</i>
  </button>
  {showMenu && (
    <div className="dropdown-menu">
      <button onClick={() => handleOptionClick("Block")}>Block</button>
      <button onClick={() => handleOptionClick("Report")}>Report</button>
      <button onClick={() => handleOptionClick("Delete")}>Delete</button>
    </div>
  )}
</div>

        </div>
      </div>
      
      <div className="messages-container">
        <div className="messages">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.sender === "currentUser" ? "outgoing" : "incoming"}`}
            >
              <div className="message-content">
                <p>{msg.text}</p>
                <span className="message-time">{msg.timestamp}</span>
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
      </div>
      
      <form className="message-input" onSubmit={handleSendMessage}>
        <button type="button" className="attachment-button">
          <i className="icon">📎</i>
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" style={{backgroundColor:'#003b46'}} disabled={message.trim() === ""}>
          Send
        </button>
      </form>
    </div>
  );
}