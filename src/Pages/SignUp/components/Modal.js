import React, { useState } from "react";
import axios from "axios";

export default function Modal({ onClose,setOtpFromUser,formData,handleclick,setIsOTPVerified,OTP }) {
    const [otp_from_user,setOtp] = useState('');
    const handleverify = async ()=>{
        if(otp_from_user.length === 0){
            alert("Enter the  OTP!!");
            return;
        }
        if (OTP === otp_from_user) {
          setIsOTPVerified(true);
          console.log(formData);
          try{
            const res = await axios.post('http://localhost:5000/signup',formData);
            console.log(res.data);
            handleclick(formData.email);
          }
          catch(error){
            alert(error.response.data.message);
          }
      } else {
          alert("WRONG OTP!!");
      }
        //setOtpFromUser(otp);
    }
  return (
    <div>
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div className="modal-dialog" style={{ width: "60%" }} role="document">
          <div className="modal-content">
            <div className="modal-header" style={{ display: "flex", justifyContent: "space-between" }}>
              <h5 className="modal-title">Modal title</h5>
              <button
                style={{
                  background: "transparent",
                  color: "black",
                  fontSize: "30px",
                  padding: 0,
                  marginRight: "10px",
                  marginTop: "-10px",
                }}
                type="button"
                className="close"
                aria-label="Close"
                onClick={onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Enter the OTP you recieved in your Email</p>
              <input onChange={(e)=>{setOtp(e.target.value)}} value={otp_from_user}/>
            </div>
            <div className="modal-footer">
              <button onClick={handleverify} type="button" className="btn btn-primary">
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
