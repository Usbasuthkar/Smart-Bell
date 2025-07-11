import React from 'react';
import UserCard from './UserCard';
import '../styles/UserList.css';

const UserList = ({ users, isClient, onUserSelect }) => {
  if (users.length === 0) {
    return (
      <div className="empty-list">
        <p>No results found. Try adjusting your search or filters.</p>
      </div>
    );
  }
  
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard 
          key={user._id} 
          user={user} 
          isClient={isClient} 
          onSelect={() => onUserSelect(user)} 
        />
      ))}
    </div>
  );
};

export default UserList;