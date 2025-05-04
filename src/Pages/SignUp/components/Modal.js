import React, { useState } from "react";
import axios from "axios";

export default function Modal({ onClose, setOtpFromUser, formData, handleclick, setIsOTPVerified, OTP }) {
  const [otp_from_user, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleverify = async () => {
    if (otp_from_user.length === 0) {
      alert("Enter the OTP!!");
      return;
    }

    setLoading(true);
    try {
      if (OTP === otp_from_user) {
        setIsOTPVerified(true);
        const res = await axios.post('https://smart-bell-server.onrender.com/signup', formData);
        console.log(res.data);
        handleclick(formData.email);
      } else {
        alert("WRONG OTP!!");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
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
              <h5 className="modal-title">OTP Verification</h5>
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
              <p>Enter the OTP you received in your Email</p>
              <input
                className="form-control"
                onChange={(e) => setOtp(e.target.value)}
                value={otp_from_user}
                placeholder="Enter OTP"
              />
            </div>
            <div className="modal-footer">
              <button onClick={handleverify} type="button" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    &nbsp;Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
