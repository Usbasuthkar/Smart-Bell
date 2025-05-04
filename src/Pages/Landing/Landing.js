import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Header from './Components/Header';
import About from "./Components/About";

export default function Landing() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div>
            <Header />
            <div style={styles.container}>
                <div className="card" style={styles.card}>
                    <div className="card-body" style={{display: 'flex', flexDirection: 'row', marginTop: 0}}>
                        <div style={{marginTop: "136px"}}>
                            <div className={`fade-in ${isVisible ? 'visible' : ''}`} style={{fontSize: 40}}>
                                Welcome to Enterprise Maverick
                            </div>
                            <div className={`fade-in ${isVisible ? 'visible' : ''}`} style={{fontSize: 20, marginTop: 10}}>
                                Where Network Meets Magic
                            </div>
                            <div style={{paddingTop: "16px", paddingLeft: "2px", display: 'flex', gap: "8px", marginBottom: "10px"}}>
                                <Link to='/Signup'>
                                    <button className="btn btn-primary" style={{backgroundColor: "#293e73", width: "200px"}}>
                                        Get started
                                    </button>
                                </Link>
                            </div>
                            <small className={`fade-in ${isVisible ? 'visible' : ''}`}>Meet 100+ Investors and clients starting today</small>
                        </div>
                        <div style={{marginTop: 48, marginRight: 20}}>
                            <img width={500} alt="Brand" style={{paddingLeft: 100, paddingTop: 100}} src="Brand.jpg" />
                        </div>
                    </div>
                </div>
            </div>
            <About />
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        minHeight: "100vh",
    },
    card: {
        paddingTop: "4%",
        paddingLeft: "8%",
        width: "100%",
        height: "90vh",
        display: "flex",
        backgroundColor: "#fbfaff",
        borderRadius: 20,
        border: "1px solid #ccc",
    }
};
