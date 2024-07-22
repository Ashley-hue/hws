import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginSignup.css";
import x from "../components/Assets/weldman.png";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      toast.success("Logged in successfully!");
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (
      firstName &&
      lastName &&
      email &&
      phone &&
      password === confirmPassword
    ) {
      toast.success("Registered successfully!");
    } else {
      toast.error("Registration failed. Please check your information.");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-signup-container">
      <div className={`form-container ${isLogin ? "" : "slide-left"}`}>
        <div className="form login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          <p className="form-switch">
            Not Registered? <span onClick={toggleForm}>Signup</span>
          </p>
        </div>
        <div className="form signup-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
          <p className="form-switch">
            Registered? <span onClick={toggleForm}>Login</span>
          </p>
        </div>
        <div className="image-container">
          <img src={x} alt="Decorative" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginSignup;
