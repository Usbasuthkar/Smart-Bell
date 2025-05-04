import React, { useState } from "react";
import "../styles/ChatSidebar.css"

export default function ChatSidebar({ contacts, activeChat, onChatSelect, loading }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-sidebar">
      <div className="chat-sidebar-header">
        <h2>Messages</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search contacts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <i className="search-icon">🔍</i>
        </div>
      </div>
      
      <div className="contacts-list">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading contacts...</p>
          </div>
        ) : filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`contact-item ${activeChat === contact.id ? "active" : ""}`}
              onClick={() => onChatSelect(contact.id)}
            >
              <div className="contact-avatar">
                <img src={contact.avatar} alt={contact.name} />
                <span className={`user-type ${contact.userType}`}>
                  {contact.userType === "investor" ? "Investor" : "Client"}
                </span>
              </div>
              <div className="contact-info">
                <div className="contact-header">
                  <h3>{contact.name}</h3>
                  <span className="time">{contact.time}</span>
                </div>
                <div className="last-message-container">
                  <p className="last-message">{contact.lastMessage}</p>
                  {contact.unread > 0 && (
                    <span className="unread-count">{contact.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-contacts">
            <p>No contacts found</p>
          </div>
        )}
      </div>
    </div>
  );
}