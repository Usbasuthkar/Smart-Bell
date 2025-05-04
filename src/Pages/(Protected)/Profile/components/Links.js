import React from "react";
import '../styles/ProfilePage.css'
export default function Links({link}){
    return(
        <div className="activity-item">                                      
            <div className="activity-content">                     
                <div>{link}</div>                   
            </div>                 
        </div>
    )
}