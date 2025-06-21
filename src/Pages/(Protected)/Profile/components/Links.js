
import TextField from '@mui/material/TextField'
import '../styles/ProfilePage.css'
import { useState } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';

export default function Links({link,setInputLink,email,role}){
    const [data,setData] = useState('');
    const updateLink = async ()=>{
        if(data === ''){
            alert('please fill the blank or reload the page');
        }
        try{
            await axios.put(`https://smart-bell-server.onrender.com/${role}_update`,{email,data,key:'otherlinks'})
        }catch(error){
            console.log(error);
        }finally{
            setInputLink(false);
        }
    }
    return(
        <div className="activity-item">                                      
            {link === 'input' ? (<div>
                <TextField onChange={(e)=>{setData(e.target.value)}} value={data}/>
                    <Button onClick={updateLink}>Add new link</Button>
            </div>) : 
            (<div className="activity-content">                     
                <div>{link}</div>                   
            </div>   )}              
        </div>
    )
}