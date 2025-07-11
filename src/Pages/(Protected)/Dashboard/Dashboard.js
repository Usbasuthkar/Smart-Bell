import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../Components/Header';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import UserList from './components/UserList';
import UserProfileModal from './components/UserProfileModal';
import { mockClients, mockInvestors } from './mockData';
import axios from "axios";
import './styles/Dashboard.css';

const Dashboard = () => {
  const { email } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Determine if current user is client or investor
  useEffect(()=>{
    const get_user_type = async ()=>{
      try{
        const res = await axios.get(`http://localhost:5000/usertype?email=${email}`);
        setUserType(res.data.type);
        const isClient = res.data.type === 'Client' ? true : false;
        setIsClient(isClient);
      }catch(error){
        alert(error);
      }
    }
    get_user_type();
  },[])

  // Fetch users based on userType
  useEffect(() => {
    const get_role_based_data = async ()=>{
      try{
        console.log('userType :', userType);
        const res = await axios.get(`http://localhost:5000/dashboard?userType=${userType}`);
        console.log('fetched rows : ', res);
        const fetchedUsers = res.data.data;
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      }catch(error){
        alert(error);
      }
    }

    // In a real app, this would be an API call
    // const isClient = userType === 'Investor' ? false : true;
    // const fetchedUsers = isClient ? mockInvestors : mockClients;


    if(userType && userType !== '') { 
      get_role_based_data(); 
    }
  }, [userType]);

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