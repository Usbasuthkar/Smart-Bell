import React from "react";
import '../styles/ProfilePage.css'
export default function AddDetails({label,value}){
    return(
        <div className="message-preview">                   
            <div className="message-content">                     
                <div className="message-header">                       
                        <h4>{label}</h4>                     
                </div>                     
                <div>{value}</div>                   
            </div>                 
        </div>
    )
}