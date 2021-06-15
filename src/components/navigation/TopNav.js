import React from "react";
import { Link } from "react-router-dom";

const TopNav = ({ onLogout, auth }) => {
  const onLogoutClick = () => {
    onLogout();
  };
  
  return (
    <div className="ui menu secondary">
      <Link to="/" className="item">
        Swolemates
      </Link>
      <Link to={`/profile/${auth.user.id}`} key={auth.user.id} className="item">
        profile
      </Link>
      <div className="right menu">
        <Link to="/signup" className="item" >Sign Up</Link>
        <Link onClick={() => onLogoutClick()} to="/login" className="item">Logout</Link>
      </div>
    </div>
  );
};

export default TopNav;
