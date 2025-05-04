import React from "react";

export default function Footer() {
  return (
    <div style={footerStyle}>
      <div style={contentStyle}>
        <p style={textStyle}>Smart Bells</p>
        <p style={textStyle}>Contact Us: info@smartBells.com | +123 456 7890</p>
      </div>
    </div>
  );
}

const footerStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '20px 0',
  textAlign: 'center',
  width: '100%',
  bottom: '0',
  left: '0'
};

const contentStyle = {
  maxWidth: '900px',
  margin: '0 auto',
};

const textStyle = {
  margin: '5px 0',
};
