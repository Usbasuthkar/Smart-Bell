import React, { useState,useEffect,useRef  } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../Components/Header";
import './styles/ProfilePage.css'
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Modal from "./components/Modal";
import AddIcon from '@mui/icons-material/Add';
import Links from "./components/Links";
import axios from "axios";
import AddDetails from "./components/AddDetails";

export default function Profile({view}) {
  const { email} = useParams();
  const linkInputRef = useRef(null);
  const [createProject,setCreateProject] = useState(false);
  const [showModal,setShowModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');
  const [linkInput,setLinkInput] = useState(false);
  const [role,setRole] = useState('');
  const [change,setChange] = useState('');

  useEffect(()=>{
    const get_role = async ()=>{
      try{
        const res = await axios.get(`https://smart-bell-server.onrender.com/usertype?email=${email}`);
        setRole(res.data.type);
      }catch(error){
        alert(error);
      }
    }
    get_role();
  },[])

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (linkInputRef.current && !linkInputRef.current.contains(event.target)) {
      setLinkInput(false);
    }
  };

  if (linkInput) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [linkInput]);

  useEffect(()=>{
    const get = async ()=>{
      try{
        setLoading(true);
        const res = await axios.get(`https://smart-bell-server.onrender.com/${role}?email=${email}`);
        setUserData(res.data);
      }catch(error){
        setError(error);
        console.log(error);
      }finally{
        setLoading(false);
      }
    }
    if(linkInput === false && role!=='')get();
  },[change,role]);

  if(loading)return <div>loading ... </div>
  if(error) return <div>{error}</div>
  console.log(userData);
  return (
    <div className="profile-container">
      <Header email={email}/>
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-cover-photo"></div>
          <div className="profile-avatar-container">
            <div className="profile-avatar"><img src="/user.png" alt='User' style={{marginTop:'-5px',marginLeft:'-4.7px',borderRadius:"50%"}} width={150}/></div>
            <h1>{userData.name}</h1>
            {role === 'Client' ? ( <p className="profile-title">{userData.companyName}</p>):(
              <p className="profile-title">{userData.investorType}</p>
            )}
            <div className="profile-meta">
              <span>{userData.location}</span>
              <span>Joined on {userData.join_month} {userData.join_year}</span>
            </div>
          </div>
        </div>
        <div className="profile-body">
        <div className="profile-actions" style={action_numbers}>
          <div style={{ textAlign: 'center' }}>
            <div style={inv_cli_number}>{userData.investments}</div>
            <div style={{marginTop: '10px',fontSize: '16px',fontWeight: '500',color: '#555'}}>Investments</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={connection_number}>{userData.connections}</div>
            <div style={connection}>Connections</div>
          </div>
        </div>
          {view && <div className="profile-actions" style={{marginTop:'10px'}}>
            <button className="contact-btn">Contact</button>
            <button className="connect-btn">Connect</button>
          </div>}
          <div className="profile-sections">
            <About view={view} userData={userData} role={role}/>
            <div className="profile-section portfolio-section">
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <h2>Portfolio</h2>
                {role === 'Client' && !view &&<span style={{cursor:'pointer'}} onClick={()=>{setCreateProject(true)}}><AddIcon/></span>}
              </div>
              <div className="portfolio-list">
                {userData.Portfolio.map((item, index) => (
                  <Portfolio setChange={setChange} email={userData.email} key={index} item={item} index={index} setCreateProject={setCreateProject}/>
                ))}
                {createProject && <Portfolio setChange={setChange} email={userData.email} setCreateProject={setCreateProject} item={{creation:true}}/>}
              </div>

            <div style={{display:'flex',justifyContent:'center',marginTop:"20px"}}>
              <button onClick={()=>{setShowModal(true)}}>Click to see more</button>
            </div>
            <Modal show={showModal} onClose={()=>{setShowModal(false)}} portfolio={userData.portfolio}/>             
            </div>             
                    
        <div className="profile-section">               
            <div className="section-header">                 
                <h2>Links</h2> 
                {!view && <span style={{cursor:'pointer'}} onClick={()=>{if(!linkInput)setLinkInput(true);else{setLinkInput(false)}}}><AddIcon/></span>}
            </div>               
            <div className="activity-feed" style={{display:'flex',gap:'20px',flexDirection:'column'}} ref={linkInputRef}> 
              <Links link={userData.linkedinProfile}/>
                {userData.otherlinks.split(", ").map((link,index)=>{
                  return <Links role={role} email={userData.email} key={index} link={link} setInputLink={setLinkInput}/>
                })} 
                {linkInput && <Links role={role} link="input" email={userData.email} setInputLink={setLinkInput}/>}              
            </div>             
        </div>              
        <div className="profile-section">
            <div className="section-header"> 
                <h2>Additional Details</h2>               
            </div>               
            <div className="messages-list">                 
                {role==='Client'?(<div>
                  <AddDetails label="Experience" value={userData.experienceLevel}/>
                  <AddDetails label="Role" value={userData.role}/>
                </div>):(<div>
                  <AddDetails label="Experience" value={userData.investmentExperience}/>
                  <AddDetails label="Investment Range" value={userData.investmentRange}/>
                  <AddDetails label="Role" value={role}/>
                </div>)}                                
                </div>             
            </div>           
        </div>         
    </div>       
</div>     
</div>        
  );
}
const inv_cli_number = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60px',
  height: '60px',
  border: '1px solid #ccc',
  borderRadius: '50%',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  fontSize: '18px',
  fontWeight: 'bold',
  backgroundColor: '#fff',
  color: '#333',
  margin: '0 auto'
}
const action_numbers = {marginTop: '40px',
  display: 'flex',
  justifyContent: 'center',
  gap: '60px'
}
const connection_number = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60px',
  height: '60px',
  border: '1px solid #ccc',
  borderRadius: '50%',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  fontSize: '18px',
  fontWeight: 'bold',
  backgroundColor: '#fff',
  color: '#333',
  margin: '0 auto'
}
const connection = {
  marginTop: '10px',
  fontSize: '16px',
  fontWeight: '500',
  color: '#555'
}