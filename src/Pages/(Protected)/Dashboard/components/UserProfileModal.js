import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserProfileModal.css';

const UserProfileModal = ({ user, isClient, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{user.name}</h2>
            <button 
              onClick={onClose}
              className="modal-close-button"
            >
              ✕
            </button>
          </div>
          
          <div className="modal-avatar">
            {user.profileImage ? (
              <img 
                src={user.profileImage} 
                alt={user.name} 
                className="modal-avatar-image"
              />
            ) : (
              <div className="modal-avatar-placeholder">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="modal-info-section">
            <h3 className="modal-info-label">
              {isClient ? 'Investor Type' : 'Project Name'}
            </h3>
            <p>{isClient ? user.investorType : user.projectName}</p>
          </div>
          
          {isClient ? (
            <>
              <div className="modal-info-section">
                <h3 className="modal-info-label">Investment Range</h3>
                <p>{user.investmentRange}</p>
              </div>
              <div className="modal-info-section">
                <h3 className="modal-info-label">Industry Focus</h3>
                <p>{user.industry}</p>
              </div>
            </>
          ) : (
            <>
              <div className="modal-info-section">
                <h3 className="modal-info-label">Project Type</h3>
                <p>{user.projectType}</p>
              </div>
              <div className="modal-info-section">
                <h3 className="modal-info-label">Funding Stage</h3>
                <p>{user.fundingStage}</p>
              </div>
              <div className="modal-info-section">
                <h3 className="modal-info-label">Funding Needed</h3>
                <p>{user.fundingNeeded}</p>
              </div>
            </>
          )}
          
          <div className="modal-info-section">
            <h3 className="modal-info-label">Description</h3>
            <p className="modal-description">{user.description}</p>
          </div>
          
          <Link
            to={`/view-profile/${user.id}`}
            className="profile-link-button"
          >
            View Full Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;