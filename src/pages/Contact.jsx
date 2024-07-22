import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";
import contactbg from "../components/Assets/conntbg.jpeg";
import mapimg from "../components/Assets/contbg.jpeg";
import addressicon from "../components/Assets/addressicon.png";
import phoneicon from "../components/Assets/phoneicon.png";
import webicon from "../components/Assets/webicon.png";
import emailicon from "../components/Assets/emailicon.png";
import logo from "../components/Assets/weldinglog.png"
import fb from "../components/Assets/fb.png"
import ig from "../components/Assets/ig.png"
import x from "../components/Assets/x.png"

const Contact = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formValues.fullName) {
      validationErrors.fullName = "Full Name is required.";
    }
    if (!formValues.phoneNumber) {
      validationErrors.phoneNumber = "Phone Number is required.";
    }
    if (!formValues.email) {
      validationErrors.email = "Email is required.";
    }
    if (!formValues.message) {
      validationErrors.message = "Message is required.";
    }
    // if (!formValues.phoneNumber < 10 || !formValues.phoneNumber > 10) {
    //   validationErrors.message = "Invalid phone number";
    // }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);

      axios.post("http://localhost:5000/send", formValues)
      .then(response => {
        setIsLoading(false);
        setSuccessMessage("Your message has been sent successfully!");
        setFormValues({ fullName: "", phoneNumber: "", email: "", message: "" })
      })
      .catch(error => {
        setIsLoading(false);
        console.log("There was an error sending the message!", error);
        setSuccessMessage("There was an error sending your message. Please try again.");
      });
    }
  };

  return (
    <div>
      <div className="contactContainer">
        <img src={contactbg} className="contactbg" alt="Contact" />
        <div className="contact-overlay">
          <div className="contact-content">
            <h1>
              Contact <p>Us</p>
            </h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="text-container">
          <h1>
            Get in <span>Touch</span>
          </h1>
          <p>Got questions? Let's chat!</p>
          <div className="contactdeats">
            <div className="contact-info">
              <div className="contact-item">
                <img src={phoneicon} alt="phone" className="icon" />
                <div className="contact-details">
                  <h3>Phone Number</h3>
                  <p>0726102499</p>
                </div>
              </div>
              <div className="contact-item">
                <img src={emailicon} alt="email" className="icon" />
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>Dynaweld52@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="contact-infos">
              <div className="contact-items">
                <img src={webicon} alt="phone" className="icon" />
                <div className="contact-detail">
                  <h3>Socials</h3>
                  <p>www.hardware&welding.com</p>
                </div>
              </div>
              <div className="contact-items">
                <img src={addressicon} alt="email" className="icon" />
                <div className="contact-detail">
                  <h3>Address</h3>
                  <p>
                    Industrial area, <br />
                    Dar es Salaam Rd
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="message-container">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-field">
                {errors.fullName && (
                  <span className="error">{errors.fullName}</span>
                )}
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="input-small"
                  value={formValues.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-field">
                {errors.phoneNumber && (
                  <span className="error">{errors.phoneNumber}</span>
                )}
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="phone-area"
                  value={formValues.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="input-field">
              {errors.email && <span className="error">{errors.email}</span>}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="input-large"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-field">
              {errors.message && (
                <span className="error">{errors.message}</span>
              )}
              <textarea
                name="message"
                placeholder="Message"
                rows="6"
                className="input-large"
                value={formValues.message}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
            {successMessage && <p className="success">{successMessage}</p>}
          </form>
        </div>
      </div>
      <div className="map-container">
        <div className="office-info">
          <h1>Our Offices</h1>
          <div className="cards">
            <div className="area-card">
              <h3>Showroom Office</h3>
              <div className="addressplace">
                <img src={addressicon} className="imgcard" alt="address" />
                <div className="card-content">
                  <h4>Address</h4>
                  <p>
                    Industrial Area,
                    <br />
                    Dar es Salaam Rd, <br />
                    Building 15 Next to Stanbic
                  </p>
                </div>
              </div>

              <div className="addressplace">
                <img src={phoneicon} className="imgcard" alt="phone" />
                <div className="card-content">
                  <h4>Phone Number</h4>
                  <p>0726102499</p>
                </div>
              </div>

              <div className="addressplace">
                <img src={emailicon} className="imgcard" alt="email" />
                <div className="card-content">
                  <h4>Email</h4>
                  <p>Dynaweld52@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="area-card">
              <h3>Pembe Plaza</h3>
              <div className="addressplace">
                <img src={addressicon} className="imgcard" alt="address" />
                <div className="card-content">
                  <h4>Address</h4>
                  <p>
                    Industrial Area,
                    <br />
                    Enterprise Rd, <br />
                    Pembe Plaza
                  </p>
                </div>
              </div>

              <div className="addressplace">
                <img src={phoneicon} className="imgcard" alt="phone" />
                <div className="card-content">
                  <h4>Phone Number</h4>
                  <p>0724621977</p>
                </div>
              </div>

              <div className="addressplace">
                <img src={emailicon} className="imgcard" alt="email" />
                <div className="card-content">
                  <h4>Email</h4>
                  <p>Johngitonga12@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="map-area">
          <img src={mapimg} alt="mapimg" className="mapimage" />
        </div>
      </div>
      <div className="footer-container">
        <div className="footer-first">
          <div className="footer-content">
            <img src={logo} alt="" className="footlogo" />
            <h4>Hardware & Welding Supplies</h4>
          </div>
          <div className="footer-description">
            <p>
              Whether you have a question, feedback, or need assistance, our
              team is here to help. Your satisfaction is our priority, and we
              look forward to hearing from you soon!
            </p>
          </div>
        </div>
        <div className="footer-second">
          <h4>Services</h4>
          <ul>
            <li>Equipment Sales</li>
            <li>Machine Repair</li>
            <li>Custom Fabrication</li>
            <li>Consultation</li>
            <li>Maintenance Plans</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="footer-third">
          <h4>Work Hours</h4>
          <p>Mon - Fri 9:00 AM - 4:00 PM</p>
          <p>Sat 9:00 AM - 1:00 PM</p>
          <div>
            <h4>Follow Us</h4>
            <div className="follow-us">
              <a href="https://www.facebook.com/HardwareandWelding/">
                <img src={fb} alt="" />
              </a>
              <a href="https://www.instagram.com/hardware_and_welding/">
                <img src={ig} alt="" className="follow-icon" />
              </a>
              <img src={x} alt="" className="follow-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
