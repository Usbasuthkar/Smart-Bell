import React from "react";
import '../styles/ProfilePage.css';

export default function Modal({ show, onClose, portfolio }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" style={{color:'black'}} onClick={onClose}>X</button>
        <h2>All Portfolio Projects</h2>
        <div className="portfolio-modal-list">
          {portfolio.map((item, index) => (
            <div key={index} className="portfolio-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><strong>Status:</strong> {item.status}</p>
              <p><strong>Funding:</strong> {item.fundingAmount}</p>
              <p><strong>Investment Date:</strong> {item.investmentDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
