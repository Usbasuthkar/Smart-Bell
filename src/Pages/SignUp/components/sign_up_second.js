import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Signupsecond({goBack,Investor,Client}){
    return(
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                {/* <button onClick={goBack} style={{ background: 'transparent', border: 'none', padding: 0 }}>
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" color="black"/>
                </button> */}
                <h1 style={{ marginRight: '16px', flex: 1, textAlign: 'center' }}>Create an account</h1>
            </div>
              <center style={{marginTop:'100px'}}>
                <h2>Choose whether you are</h2>
                <div style={{marginTop:'50px',display:'flex',justifyContent:'center',flexDirection:'row',gap:'10px'}}>
                  <button onClick={Investor} style={{width:"30%",backgroundColor:'#293e73'}} className="btn btn-primary">Investor</button>
                  <button onClick={Client} style={{width:"30%",backgroundColor:'#293e73'}} className="btn btn-primary">Client</button>
                </div>
              </center>
        </div>
    );
}
