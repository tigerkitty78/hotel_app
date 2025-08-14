import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#2c3e50",
    color: "white",
  };

  const linkContainer = {
    display: "flex",
    gap: "15px",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  };

  const linkHover = {
    textDecoration: "underline",
  };

  return (
    <nav style={navStyle}>
      <h2>Hotel Management</h2>
      <div style={linkContainer}>
        <Link to="/roomlist" style={linkStyle}>View Rooms</Link>
        <Link to="/roomform" style={linkStyle}>Add a Room</Link>
      </div>
    </nav>
  );
};

export default Navbar;
