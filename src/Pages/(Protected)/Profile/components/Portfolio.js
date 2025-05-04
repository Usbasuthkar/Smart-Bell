import React from "react";
import '../styles/ProfilePage.css'
export default function Portfolio({item,index}){
    return(
        <div key={index} className="portfolio-card">
            <div className="portfolio-header">
                <h3>{item.title}</h3>
                <span className={`status-badge ${item.status.toLowerCase()}`}>{item.status}</span>
            </div>
            <p className="portfolio-description">{item.description}</p>
            <div className="portfolio-meta">
                <span className="investment-amount">Investment: {item.fundingAmount}</span>
                <span className="investment-date">Date: {item.investmentDate}</span>
            </div>
            <button className="details-btn">View Details</button>
        </div>
    )
}