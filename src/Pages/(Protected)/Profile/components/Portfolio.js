import React, { useEffect, useState } from "react";
import '../styles/Portfolio.css';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Portfolio({ setChange,email,item, index,setCreateProject }) {
    const [showModal, setShowModal] = useState(false);
    const [data,setData] = useState({
        title:'',
        status:'Active',
        description:'',
        fundingAmount:'',
        projectCreationDate:`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
    })
    useEffect(()=>{
        if(item.creation){
        setShowModal(true);
    }
    },[]);
    const handleChange = (field) => (e) => {
        setData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () =>{ setCreateProject(false); setShowModal(false); }
    const createProject = async ()=>{
        if(data.title === '' || data.description === '' || data.fundingAmount === ''){
            alert('Please fill all the details');
            return;
        }
        console.log(data);
        try{
        await axios.put("http://localhost:5000/client_update",{email,data,key:'Portfolio'})
        }
        catch(error){console.log(error);}
        finally{setCreateProject(false);
        setChange('portfolio');}
    }
    return (
        <>
            {!item.creation && <div key={index} className="portfolio-card">
                <div className="portfolio-header">
                    <h3>{item.title}</h3>
                    <span className={`status-badge ${item.status.toLowerCase()}`}>{item.status}</span>
                </div>
                <div className="portfolio-meta">
                    <span className="investment-date">Date: {item.projectCreationDate}</span>
                </div>
                <button onClick={handleOpenModal} className="details-btn">View Details</button>
            </div>}

            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={handleCloseModal}>×</button>
                        {!item.creation ? (<div>
                            <h2>{item.title} - Details</h2>
                        <p><strong>Status:</strong> {item.status}</p>
                        <p><strong>Description:</strong> {item.description}</p>
                        <p><strong>Funding Amount:</strong> {item.fundingAmount}</p>
                        <p><strong>Project Creation Date:</strong> {item.projectCreationDate}</p>
                        </div>):(<div style={{display:'flex',flexDirection:'column',gap:'30px'}}>
                            <h2>{item.title} - Details</h2>
                        <div><strong>Title:</strong><TextField onChange={handleChange('title')} sx={{marginLeft:'50px'}} id="standard-basic" variant="standard"/></div>
                        <div><strong>Status:</strong><TextField onChange={handleChange('status')} sx={{marginLeft:'50px'}} disabled value="Active" id="standard-basic" variant="standard"/></div>
                        <div><strong>Description:</strong><TextField onChange={handleChange('description')} sx={{marginLeft:'50px'}} id="standard-basic" variant="standard"/></div>
                        <div><strong>Funding Amount:</strong><TextField onChange={handleChange('fundingAmount')} sx={{marginLeft:'50px'}} id="standard-basic" variant="standard"/></div>
                        <div><strong>Poject Creation Date:</strong><TextField onChange={handleChange('projectCreationDate')} disabled sx={{marginLeft:'50px'}} value={`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`} id="standard-basic" variant="standard"/></div>
                        <Button onClick={createProject}>Submit</Button>
                        </div>)}
                        {/* Add more details here if needed */}
                    </div>
                </div>
            )}
        </>
    );
}
