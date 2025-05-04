import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../Components/Header';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import UserList from './components/UserList';
import UserProfileModal from './components/UserProfileModal';
import { mockClients, mockInvestors } from './mockData';
import './styles/Dashboard.css';

const Dashboard = () => {
  const { email } = useParams();
  const userType = 'client'
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Determine if current user is client or investor
  const isClient = true;

  // Fetch users based on userType
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchedUsers = isClient ? mockInvestors : mockClients;
    setUsers(fetchedUsers);
    setFilteredUsers(fetchedUsers);
  }, [isClient]);

  // Handle search and filter changes
  useEffect(() => {
    let result = [...users];
    
    // Apply search
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(user => user[key] === value);
      }
    });
    
    setFilteredUsers(result);
  }, [searchTerm, filters, users]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="dashboard-container">
      <Header email={email} />
      
      <main className="dashboard-main">
        <h1 className="dashboard-title">
          {isClient ? 'Available Investors' : 'Client Projects'}
        </h1>
        
        <div className="dashboard-content">
          {/* Sidebar with filters */}
          <div className="dashboard-sidebar">
            <FilterPanel 
              isClient={isClient} 
              onFilterChange={handleFilterChange} 
            />
          </div>
          
          {/* Main content */}
          <div className="dashboard-main-content">
            <SearchBar onSearch={handleSearch} />
            
            <UserList 
              users={filteredUsers} 
              isClient={isClient} 
              onUserSelect={handleUserSelect} 
            />
          </div>
        </div>
      </main>
      
      {/* Modal */}
      {showModal && selectedUser && (
        <UserProfileModal 
          user={selectedUser} 
          isClient={isClient} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default Dashboard;