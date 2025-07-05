import React, { useState } from "react";
import "./style/Loginpage.css";
import Header from '../Landing/Components/Header';
import {Server_uri} from '../../url'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./components/Modal";

const LoginPage = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [visible,SetVisibility] = useState('password')
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginUser = async (email, password) => {
    setLoading(true)
    try {
      const res = await axios.post(`${Server_uri}/login`, {
        email,
        password
      });
      console.log(res.data);
      navigate(`/dashboard/${encodeURIComponent(email)}`);
    } catch (error) {
      setEmail('');
      setPassword('');
      alert(error.response?.data?.message || "Login failed");
    }
    finally{
      setLoading(false);
    }
  };
    const handlesubmit = (e)=>{
      e.preventDefault(); 
      loginUser(email, password);
    }

    const handleVisibility = ()=>{
      if(visible.length === 0){
        SetVisibility('password');
      }
      else{
        SetVisibility('');
      }
    }
  return (
    <div>
      <Header/>
      <div className="login-container">
      <div className="login-box">
        
        <h1>Welcome to Network Maverick</h1>
        <p>Sign in to your account below</p>

        <form onSubmit={handlesubmit}>
          <label>Email</label>
          <input value={email}
           onChange={(e)=>{setEmail(e.target.value)}}
           type="email" placeholder="e.g arbi@globalxtreme.net" />

          <label>Password</label>
          <div className="password-container">
            <input value={password}
             onChange={(e)=>{setPassword(e.target.value)}} type={visible} />
            <span onClick={handleVisibility} className="eye-icon">👁</span>
          </div>

          <div className="options">
          <div style={{display:'flex'}}>
            <div style={{marginRight:10,marginTop:2}}>
             <input type="checkbox" />
          </div>
            <label>
               Keep Me Signed in
            </label>
          </div>
            <div onClick={() => setShowModal(true)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
              Forgot password?
            </div>
            {showModal && <Modal onClose={()=>{setShowModal(false)}}/>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                &nbsp;Logging in...
              </>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <p className="version">Version <span>1.0.0</span></p>
        <p className="footer">© 2025 Network Maverick - Committed to better quality</p>
      </div>
      <div className="image-section">
        <img src="Login_img.jpg" alt="Scenic Beach" />
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
