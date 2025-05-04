import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import emailjs from 'emailjs-com';

export default function Signupfirst({ handleclick}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [OTP, setOTP] = useState('123456');
  const [otp_from_user, setOtpFromUser] = useState('');
  const [isOTPVerified, setIsOTPVerified] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.agreeToTerms) {
      alert("Please fill all the fields and agree to the terms.");
      return;
    }
    // let digits = '';
    // for (let i = 0; i < 6; i++) {
    //   digits += Math.floor(Math.random() * 10);
    // }
    // setOTP(digits);
    // emailjs.send("service_f640oe4", "template_lz2ldy7", { to_name: formData.name, email: formData.email, message: digits }, "pSXiqI93PTJwBMb9T")
    //   .then((response) => {
    //     console.log("Message sent!");
    //   })
    //   .catch((error) => {
    //     alert("Error in sending message. Please try again!");
    //   });

    setModalVisible(true);
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <center>
          <h1>Create an account</h1>
        </center>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          required
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <label>Email</label>
        <input
          required
          type="email"
          placeholder="Enter your email (preferred gmail)"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <label>Password</label>
        <input
          required
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <div className="terms">
          <div>
            <input
              required
              type="checkbox"
              id="terms"
              checked={formData.agreeToTerms}
              onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
            />
          </div>
          <label htmlFor="terms">I agree to all the Terms & Conditions</label>
        </div>

        <button type="submit">Sign up</button>
      </form>
      <div className="social-login">
        <button className="google">Google</button>
        <button className="facebook">Facebook</button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </div>

      {modalVisible && (
        <Modal 
        OTP={OTP}
        setIsOTPVerified={setIsOTPVerified}
         handleclick={handleclick} 
         formData={formData} 
         setOtpFromUser={setOtpFromUser}
        onClose={() => { setModalVisible(false); }} />
      )}

      {modalVisible && (
        <div className="backdrop" onClick={() => setModalVisible(false)}></div>
      )}
    </div>
  );
}
