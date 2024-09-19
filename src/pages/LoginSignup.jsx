import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { sendPasswordResetEmail} from "firebase/auth";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginSignup.css";
import x from "../components/Assets/weldman.png";


const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const db = getFirestore();
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const ensureUserInFirestore = async (user) => {
    const userRef = doc(db, "Users", user.uid);
    const userSnap = await getDoc(userRef);

    if(!userSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        firstName: "",
        lastName: "",
        phone: ""
      });
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
   try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await ensureUserInFirestore(userCredential.user);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      console.log("Login error", error);
      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Invalid email or password. Please try again.");
          break;
        case "auth/user-disabled":
          toast.error(
            "This account has been disabled. Please contact support."
          );
          break;
        case "auth/too-many-requests":
          toast.error(
            "Too many failed login attempts. Please try again later."
          );
          break;
        default:
          toast.error("An unexpected error occurred. Please try again.");
      }  
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
   if (password !== confirmPassword) {
     return toast.error("Passwords do not match.");
   }
   setIsLoading(true);
   try {
     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
     const user = userCredential.user;

     await setDoc(doc(db, "Users", user.uid), {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email
     });

     toast.success("Registered successfully! Please Login.");
     setIsLogin(true);

      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
   } catch (error) {
    console.error("Error during signup: ", error);
    if(error.code === "auth/email-already-in-use") {
      toast.error("An account with this email already exists. Please log in");
      setIsLogin(true);
    }
    else {
      toast.error("Registration failed. Please check your information.");
    }   
   } finally {
    setIsLoading(false);
   }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, forgotPasswordEmail);
      toast.success("Password reset email sent. Please check your inbox")
      setShowForgotPassword(false);
    }
    catch (error) {
      console.error("Error sending password reset email.", error);
      toast.error("Failed to send password reset email. Please try again");
    }
    finally {
      setIsLoading(false);
    }
  }
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-signup-container">
      <div className={`form-container ${isLogin ? "" : "slide-left"}`}>
        <div className="form login-form">
          <h2>Login</h2>
          {!showForgotPassword ? (
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
            <button type="submit" disabled={isLoading}>{isLoading ? 'Logging in....' : 'Login'}</button>
            <p className="forgot-password" onClick={ () => setShowForgotPassword(true)}>Forgot Password?</p>
          </form>
          ) : (
            <form onSubmit={handleForgotPassword}>
              <input type="email" placeholder="Enter your email" value={forgotPasswordEmail} onChange={ (e) => setForgotPasswordEmail(e.target.value)}
              required
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Reset Password'}
              </button>
              <p className="back-to-login" onClick={() => setShowForgotPassword(false)}>Back To Login</p>
            </form>
          )}
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
            <button type="submit" disabled={isLoading}>{isLoading ? 'Signing Up...' : 'Sign Up'}</button>
          </form>
          <p className="form-switch">
            Registered? <span onClick={toggleForm}>Login</span>
          </p>
        </div>
        <div className="imagee-container">
          <img src={x} alt="Decorative" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginSignup;
