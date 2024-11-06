import React from 'react';
import './Services.css';
import sale from "../components/Assets/sell.png";
import techsupport from "../components/Assets/sup.png";
import repair from "../components/Assets/repair.png";
import fabricate from "../components/Assets/fabr.png";
import training from "../components/Assets/train.png";
import maintenance from "../components/Assets/maintain.png";
import servicesbg from "../components/Assets/servicesbgg.jpeg";
import phonecall from "../components/Assets/phonecall.png";
import processimage from "../components/Assets/prroc.png";
import procimage from "../components/Assets/procp.png";
import proceimage from "../components/Assets/procd.png";
import fb from "../components/Assets/fb.png";
import ig from "../components/Assets/ig.png";
import x from "../components/Assets/x.png";
import logo from "../components/Assets/weldinglog.png";

const Services = () => {
  return (
    <div className="services-container">
      <div className="services-bg">
        <img src={servicesbg} alt="Services Background" />
        <div className="service-overlay">
          <div className="service-content">
            <h3>Services</h3>
          </div>
        </div>
      </div>

      <div className="services">
        <div className="top-cards">
          <div className="detail-card">
            <img src={sale} alt="Equipment Sales" className="service-logo" />
            <h4>Equipment Sales</h4>
          </div>
          <div className="detail-card">
            <img
              src={techsupport}
              alt="Technical Support"
              className="service-logo"
            />
            <h4>Technical Support</h4>
          </div>
          <div className="detail-card">
            <img src={repair} alt="Machine Repair" className="service-logo" />
            <h4>Machine Repair</h4>
          </div>
        </div>
        <div className="top-cards">
          <div className="detail-card">
            <img
              src={fabricate}
              alt="Custom Fabrication"
              className="service-logo"
            />
            <h4>Custom Fabrication</h4>
          </div>
          <div className="detail-card">
            <img
              src={training}
              alt="Training and Consultation"
              className="service-logo"
            />
            <h4>Training and Consultation</h4>
          </div>
          <div className="detail-card">
            <img
              src={maintenance}
              alt="Maintenance Plans"
              className="service-logo"
            />
            <h4>Maintenance Plans</h4>
          </div>
        </div>
      </div>
      <div className="callcentre">
        <div className="appointment">
          <img src={phonecall} alt="Phone Icon" className="phoneicon" />
          <div className="text">
            <p>GET A FREE CONSULTATION</p>
            <h4>0708960136</h4>
          </div>
          <div className="appointdeats">
            <p>
              Schedule a consultation today to explore our wide range of welding
              equipment solutions.
            </p>
          </div>
        </div>
      </div>
      <div className="process-area">
        <h3>
          <span>Process</span> We Follow
        </h3>
        <div className="process-icon-container">
          <div>
            <img
              src={processimage}
              alt="Process Step 1"
              className="process-icon"
            />
          </div>
          <div>
            <img
              src={procimage}
              alt="Process Step 2"
              className="process-icon"
            />
          </div>
          <div>
            <img
              src={proceimage}
              alt="Process Step 3"
              className="process-icon"
            />
          </div>
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
}

export default Services;
