import React from "react";

function Header(){
    const Header = () => {
     return(
        <div className="header">
        <div className="logo">Agro-Connect</div>
        <div className="nav">
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/settings">Settings</a>
          <a href="/help">Help</a>
        </div>
        <div className="profile">
          <img src="profile.jpg" alt="Profile" className="profile-pic" />
          <span className="profile-name">Farmer Name</span>
        </div>
        <button className="logout">Logout</button>
      </div>
     );
   };
}

export default Header

