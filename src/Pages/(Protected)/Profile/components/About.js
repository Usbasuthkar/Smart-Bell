import React from "react";
import '../styles/ProfilePage.css'
export default function About({userData}){
    return(
        <div className="profile-section about-section">
              <h2>About</h2>
              <p>{userData.bio}</p>
              <div className="tags-container">
                {userData.tags.map((tag, index) => (
                  <div key={index} className="tag">{tag}</div>
                ))}
              </div>
            </div>
    )
}