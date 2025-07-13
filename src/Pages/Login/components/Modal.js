import React, { useState } from "react";
import axios from "axios";
import {Server_uri} from '../../../url'

export default function Modal({ onClose }) {
  const [email, setEmail] = useState('');
  const [otp_from_user, setOtp] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [new_repassword, setNewRePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmail,setShowEmail] = useState(true);
  const [showOTP,setShowOTP] = useState(false);
  const [showPasswordChange,setShowPasswordChange] = useState(false);

  const handleClickables = async () => {
    if(showOTP){
        if (otp_from_user.length === 0) {
            alert("Enter the OTP!!");
            return;
        }
        setLoading(true);
        try {
            //logic for opt handling
            setShowOTP(false);
            setShowPasswordChange(true);
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }
    if(showEmail){
      if(email.length === 0){
        alert('Enter email');
        return;
      }
        setLoading(true);
        try{
        //write logic for checking if email is registered or no
        setLoading(true);
        const res = await axios.get(`${Server_uri}/emailCheck?email=${email}`);
        if(res.data.success){
          setShowEmail(false);
          setShowOTP(true);
        }
        else{
          alert('Email not found');
        }
        }catch(error){
            alert(error.response.data.message);
        }finally{
            setLoading(false);
        }
    }
    if(showPasswordChange){
        setLoading(true);
        try{
          if(new_password === new_repassword){
            setLoading(true);
            const res = await axios.post(`${Server_uri}/forgotPassword`,{email,newPassword:new_password});
            console.log(res.data);
            setLoading(false);
            onClose();
          }else{
            alert("Passwords do not match");
          }
        }catch(error){
            alert(error);
        }
        finally{
            setLoading(false);
        }
    }
  };

  return (
    <div>
      <div
        tabIndex="-1"
        role="dialog"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1050,
        }}
      >
        <div className="modal-dialog modal-dialog-centered" style={{ width: "60%" }} role="document">
          <div className="modal-content">
            <div className="modal-header" style={{ display: "flex", justifyContent: "space-between" }}>
              <h5 className="modal-title">Forgot Password</h5>
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
                {showEmail && <div>
                    <p>Enter your registered Email id</p>
                        <input
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            required
                            placeholder="Enter Email"
                        />
                </div>}
              {showOTP && <div>
                    <p>Enter the OTP you received in your Email</p>
                        <input
                            className="form-control"
                            onChange={(e) => setOtp(e.target.value)}
                            value={otp_from_user}
                            placeholder="Enter OTP"
                            required
                            type="number"
                        />
                </div>}
                {showPasswordChange && <div>
                    <p>Enter your new password</p>
                        <input
                            className="form-control"
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={new_password}
                            type="password"
                            required
                            placeholder="Enter New Password"
                        />
                        <input
                            className="form-control"
                            onChange={(e) => setNewRePassword(e.target.value)}
                            value={new_repassword}
                            required
                            placeholder="Re Enter New Password"
                        />
                </div>}
            </div>
            <div className="modal-footer">
              <button onClick={handleClickables} type="button" className="btn btn-primary" disabled={loading}>
                {loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            &nbsp;
                            {showEmail && "Verifying..."}
                            {showOTP && "Verifying..."}
                            {showPasswordChange && "Changing Password..."}
                    </>
                    ) : (
                    <>
                        {showEmail && "Verify"}
                        {showOTP && "Verify"}
                        {showPasswordChange && "Change Password"}
                    </>
                )}
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
