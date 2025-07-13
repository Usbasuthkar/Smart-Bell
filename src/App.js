import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Landing from './Pages/Landing/Landing';
import Footer from './Components/Footer';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/SignUp/Signup';
import Dashboard from './Pages/(Protected)/Dashboard/Dashboard';
import Feed from './Pages/(Protected)/Feed/Feed';
import Chat from './Pages/(Protected)/Chat/Chat';
import Profile from './Pages/(Protected)/Profile/Profile';

function AppContent() {
  const location = useLocation();
  const shouldHideFooter = location.pathname.startsWith('/chat');

  return (
    <>
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed/:id" element={<Feed />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/profile/:id" element={<Profile view={false}/>} />
          <Route path='/view-profile/:id' element={<Profile view={true}/>}/>
        </Routes>
      </div>
      {!shouldHideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
      <AppContent />
      </BrowserRouter>
    </div>
  );
}


export default App;
