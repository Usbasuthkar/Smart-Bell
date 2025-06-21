import EditIcon from '@mui/icons-material/Edit';
import '../styles/ProfilePage.css'
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function About({userData,role,view}){
  const [input,setInput] = useState(false);
  const [data,setData] = useState('');
  const [email,setEmail] = useState('');
  const [loading,setLoading] = useState(false);

    useEffect(()=>{
      setData(userData.about);
      setEmail(userData.email);
    },[])

    const updateAbout = async ()=>{
      try{
        setLoading(true);
        await axios.put(`http://localhost:5000/${role}_update`,{email,data,key:'about'});
      }catch(error){
        console.log(error);
      }finally{ setLoading(false);setInput(false);}
    }
    return(
        <div className="profile-section about-section">
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <h2>About</h2>
                {!view && <span onClick={()=>{if(!input)setInput(true);else{setInput(false)}}} style={{cursor:'pointer'}}><EditIcon/></span>}
              </div>
              {data.length> 0 && !input ? (<p>{data}</p>):
              input ? (<TextField sx={{width:'100%'}} id="standard-basic" value={data} onChange={(e)=>{setData(e.target.value)}}/>) :
              (<div style={{color:'grey'}}>Enter about yourself</div>)}
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <div className="tags-container">
                  {role === 'Investor' ? ( userData.industries.map((tag, index) => (
                    <div key={index} className="tag">{tag}</div>
                  )))
                  :(<div className="tag">{userData.industry}</div>)}
                </div>
                { input && <Button sx={{height:'10%',marginTop:'10px'}} onClick={updateAbout}>Submit</Button>}
              </div>
            </div>
    )
}