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
            <img src={techsupport} alt="Technical Support" className="service-logo" />
            <h4>Technical Support</h4>
          </div>
          <div className="detail-card">
            <img src={repair} alt="Machine Repair" className="service-logo" />
            <h4>Machine Repair</h4>
          </div>
        </div>
        <div className="top-cards">
          <div className="detail-card">
            <img src={fabricate} alt="Custom Fabrication" className="service-logo" />
            <h4>Custom Fabrication</h4>
          </div>
          <div className="detail-card">
            <img src={training} alt="Training and Consultation" className="service-logo" />
            <h4>Training and Consultation</h4>
          </div>
          <div className="detail-card">
            <img src={maintenance} alt="Maintenance Plans" className="service-logo" />
            <h4>Maintenance Plans</h4>
          </div>
        </div>
      </div>
      <div className="callcentre">
        <div className="appointment">
          <img src={phonecall} alt="Phone Icon" className="phoneicon" />
          <div className="text">
            <p>GET A FREE CONSULTATION</p>
            <h4>0724621977</h4>
          </div>
          <div className="appointdeats">
            <p>
              Schedule a consultation today to explore our wide range of welding
              equipment solutions.
            </p>
            <button className="appointbtn">
              <b>Make Appointment</b>
            </button>
          </div>
        </div>
      </div>
      <div className="process-area">
        <h3>
          <span>Process</span> We Follow
        </h3>
        <div className="process-icon-container">
          <div>
            <img src={processimage} alt="Process Step 1" className="process-icon" />
          </div>
          <div>
            <img src={procimage} alt="Process Step 2" className="process-icon" />
          </div>
          <div>
            <img src={proceimage} alt="Process Step 3" className="process-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
