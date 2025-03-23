import React from "react";

function Footer(){
 
    const Footer = () => {
    return(
        <div className="footer">
      <div className="contact">
        <img src="logo.png" alt="Logo" className="logo" />
        <p>Contact: 7984380930</p>
        <p>Email: vyomkorat2020@gmail.com</p>
      </div>
      <div className="links">
        <a href="/buyer">Buyer</a>
        <a href="/helper">Helper</a>
        <a href="/admin">Admin</a>
      </div>
    </div>
    );
  };
}

export default Footer
