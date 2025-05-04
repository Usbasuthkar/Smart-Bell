import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../Components/Header";
import './styles/ProfilePage.css'
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Modal from "./components/Modal";
import Links from "./components/Links";
import AddDetails from "./components/AddDetails";

export default function Profile({view}) {
  const { email } = useParams();
  const [profileType, setProfileType] = useState("client");
  const [showModal,setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    title: profileType === "investor" ? "Angel Investor" : "Startup Founder",
    location: "San Francisco, CA",
    joined: "January 2024",
    bio: profileType === "investor"
      ? "Angel investor with 10+ years of experience funding early-stage startups in fintech and health tech. Looking for innovative projects with strong growth potential and dedicated founding teams."
      : "Serial entrepreneur with successful exits in SaaS. Currently developing an innovative AI-powered product to revolutionize healthcare diagnostics.",
    portfolio: [
      {
        title: "Project X",
        description: "A revolutionary tech startup that uses AI to optimize supply chain logistics.",
        status: "Active",
        fundingAmount: "$1,000,000",
        investmentDate: "March 2024",
      },
      {
        title: "FinTech Hub",
        description: "FinTech platform helping small businesses with access to micro loans.",
        status: "Funded",
        fundingAmount: "$500,000",
        investmentDate: "December 2023",
      },
    ],
    about: "A passionate entrepreneur and investor committed to driving change through innovative technology.",
    tags: ["AI", "FinTech", "Health Tech", "Startups"],
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      website: "#",
    },
  });

  return (
    <div className="profile-container">
      <Header email={email}/>
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-cover-photo"></div>
          <div className="profile-avatar-container">
            <div className="profile-avatar"><img src="/user.png" alt='User' style={{marginTop:'-5px',marginLeft:'-4.7px',borderRadius:"50%"}} width={150}/></div>
            <h1>{userData.name}</h1>
            <p className="profile-title">{userData.title}</p>
            <div className="profile-meta">
              <span>{userData.location}</span>
              <span>Joined {userData.joined}</span>
            </div>
          </div>
        </div>
        <div className="profile-body">
        <div className="profile-actions" style={action_numbers}>
          <div style={{ textAlign: 'center' }}>
            <div style={inv_cli_number}>12</div>
            <div style={{marginTop: '10px',fontSize: '16px',fontWeight: '500',color: '#555'}}>Investments</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={connection_number}>12</div>
            <div style={connection}>Connections</div>
          </div>
        </div>
          {view && <div className="profile-actions" style={{marginTop:'10px'}}>
            <button className="contact-btn">Contact</button>
            <button className="connect-btn">Connect</button>
          </div>}
          <div className="profile-sections">
            <About userData={userData}/>
            <div className="profile-section portfolio-section">
              <h2>Portfolio</h2>
              <div className="portfolio-list">
                {userData.portfolio.map((item, index) => (
                  <Portfolio item={item} index={index}/>
                ))}
              </div>

            <div style={{display:'flex',justifyContent:'center',marginTop:"20px"}}>
              <button onClick={()=>{setShowModal(true)}}>Click to see more</button>
            </div>
            <Modal show={showModal} onClose={()=>{setShowModal(false)}} portfolio={userData.portfolio}/>             
            </div>             
                    
        <div className="profile-section">               
            <div className="section-header">                 
                <h2>Links</h2>               
            </div>               
            <div className="activity-feed"> 
                <Links link="https://linkdein.com"/>               
            </div>             
        </div>              
        <div className="profile-section">
            <div className="section-header"> 
                <h2>Additional Details</h2>               
            </div>               
            <div className="messages-list">                 
                <AddDetails label="Experience" value="3+ Years"/>                 
                <AddDetails label="Preferred Range of investing" value="Rs 5 Lakhs - 10 Lakhs"/>               
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