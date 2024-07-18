import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import acc from "../Assets/acc.png"
import logo from "../Assets/weldinglog.png";

const Navbar = () => {
  const location = useLocation();
  const [menu, setMenu] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);


  useEffect(() => {
    const path = location.pathname;
    if (path.includes("about")) {
      setMenu("About");
    } else if (path.includes("services")) {
      setMenu("Services");
    } else if (path.includes("contact")) {
      setMenu("Contact");
    } else if (path === "/" || path.includes("home")) {
      setMenu("Home");
    }
  }, [location]);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" className="logo" />
        <p>HWS</p>
      </div>

      <ul className="nav-menu">
        <li>
          <Link
            to="/"
            onClick={() => {
              setMenu("Home");
            }}
          >
            Home{menu === "Home" ? <hr /> : <></>}
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            onClick={() => {
              setMenu("About");
            }}
          >
            {" "}
            About Us{menu === "About" ? <hr /> : <></>}
          </Link>
        </li>
        <li>
          <Link
            to="/services"
            onClick={() => {
              setMenu("Services");
            }}
          >
            Services{menu === "Services" ? <hr /> : <></>}
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            onClick={() => {
              setMenu("Contact");
            }}
          >
            Contact Us{menu === "Contact" ? <hr /> : <></>}
          </Link>
        </li>
      </ul>
      <div
        className="nav-account"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={acc} alt="" />
        {dropdownVisible && (
          <ul className="dropdown-menu">
            <li>
              <Link to="/dashboard"><b>Dashboard</b></Link>
            </li>
            <li>
              <Link to="/settings"><b>Settings</b></Link>
            </li>
            <li>
              <Link to="/logout"><b>Logout</b></Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
