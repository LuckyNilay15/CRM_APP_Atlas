import React from "react";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} CRM & Campaign App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
