import React from 'react';
import '../styles/UserCard.css';

const UserCard = ({ user, isClient, onSelect }) => {
  console.log('user : ', user);
  return (
    <div className="user-card">
      <div className="user-card-content">
        <div className="user-card-header">
          <div className="user-avatar">
            {user.profileImage ? (
              <img src={user.profileImage} alt={isClient ? user.name : user.companyName} className="avatar-image" />
            ) : (
              <div className="avatar-placeholder">
                {isClient ? user.name.charAt(0) : user.companyName.charAt(0)}
              </div>
            )}
          </div>
          <div className="user-basic-info">
            <h3 className="user-name">{isClient ? user.name : user.companyName}</h3>
            <p className="user-type">
              {isClient ? user.investorType : user.projectType}
            </p>
          </div>
        </div>
        
        <p className="user-description">{user.description}</p>
        
        {isClient ? (
          <div className="user-detail">
            <span className="detail-label">Investment Range:</span> {user.investmentRange}
          </div>
        ) : (
          <div className="user-detail">
            <span className="detail-label">Funding Stage:</span> {user.fundingStage}
          </div>
        )}
        
        <button
          onClick={onSelect}
          className="view-details-button"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default UserCard;