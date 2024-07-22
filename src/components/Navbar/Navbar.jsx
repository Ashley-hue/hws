import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import acc from "../Assets/acc.png";
import logo from "../Assets/weldinglog.png";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menu, setMenu] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('Logged out successfully');
    setDropdownVisible(false);
  };

  const handleLogin = () => {
    navigate('/login-signup');
    setDropdownVisible(false);
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" className="logo" />
        <p>HWS</p>
      </div>

      <ul className="nav-menu">
        <li>
          <Link to="/" onClick={() => setMenu("Home")}>
            Home{menu === "Home" ? <hr /> : null}
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setMenu("About")}>
            About Us{menu === "About" ? <hr /> : null}
          </Link>
        </li>
        <li>
          <Link to="/services" onClick={() => setMenu("Services")}>
            Services{menu === "Services" ? <hr /> : null}
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setMenu("Contact")}>
            Contact Us{menu === "Contact" ? <hr /> : null}
          </Link>
        </li>
      </ul>
      <div
        className="nav-account">
        <img src={acc} alt="" onClick={toggleDropdown}/>
        {dropdownVisible && (
          <ul className="dropdown-menu">
            {isLoggedIn ? (
              <li onClick={handleLogout}>
                <b>Logout</b>
              </li>
            ) : (
              <li onClick={handleLogin}>
               <b>Login</b>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
