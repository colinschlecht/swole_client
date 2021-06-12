import React from "react";
import { Link } from "react-router-dom";

const TopNav = ({ onLogout }) => {
  const onLogoutClick = () => {
    onLogout();
  };
  return (
    <div className="ui menu secondary">
      <Link to="/dashboard" className="item">
        Swolemates
      </Link>
      <Link to="/" className="item">
        link to something
      </Link>
      <div className="right menu">
        <Link className="item">Sign Up</Link>
        <Link className="item">Help</Link>
      </div>
    </div>
  );
};

export default TopNav;
