import React from "react";
import { Link } from "react-router-dom";
import "./styles/Header.css";
import { useAuth } from "../context/AuthContext"; 
const Header = () => {
  const { user, handleLogout } = useAuth(); 
  return (
    <header className="header">
      <div className="logo">CRM & Campaign App</div>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/audiences">Audiences</Link>
          </li>
          <li>
            <Link to="/campaigns">Campaigns</Link>
          </li>
          <li>
            <Link to="/communications">Communication Logs</Link>
          </li>
          <li>
            <Link to="/delivery-status">Delivery Status</Link>
          </li>
          <li>
            <Link to="/stats">Stats</Link>
          </li>
        </ul>
      </nav>
      <div className="user-info">
        <span>Welcome, {user?.name || "Guest"}</span>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
