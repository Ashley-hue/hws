import React from 'react'
import './Aboutus.css'
import backdrop from "../components/Assets/mapareaweld.jpeg";
import companyintro from "../components/Assets/compintro.jpeg";
import ourmission from "../components/Assets/missions.jpeg";
import values from "../components/Assets/ourvalues.jpeg";
import director from "../components/Assets/meetdir.png"
import assidir from "../components/Assets/meetas.png";
import ceo from "../components/Assets/ceo.jpeg"
import fb from "../components/Assets/fb.png";
import ig from "../components/Assets/ig.png";
import x from "../components/Assets/x.png";
import logo from "../components/Assets/weldinglog.png";
const Aboutus = () => {
  return (
    <div>
      <div className="intro-pic">
        <img src={backdrop} alt="" />
        <div className="aboutoverlay">
          <div className="about-content">
            <h3>
              <span>About </span>Us
            </h3>
          </div>
        </div>
      </div>
      <div className="mission-state">
        <div className="company-intro">
          <div className="company-text">
            <h2>Our Story</h2>
            <div className="ptag">
              <p>
                We have been a trusted provider of welding equipment for over 40
                years. Founded on the principles of quality, reliability, and
                customer satisfaction, we have grown from a small workshop to a
                leading supplier in the industry. With unwavering dedication, we
                expanded our offerings to include a comprehensive range of
                welding products, sourced from top manufacturers globally.
              </p>
            </div>
          </div>
          <div className="imagee">
            <img src={companyintro} alt="" />
          </div>
        </div>

        <div className="company-intro">
          <div className="imagee">
            <img src={ourmission} alt="" />
          </div>
          <div className="mission-text">
            <h2>Our Mission</h2>
            <div className="partag">
              <p>
                Our mission is to empower welders with the tools they need to
                succeed by providing a comprehensive range of top-quality
                equipment, backed by exceptional service and expertise. We are
                committed to ensuring that every welder, regardless of their
                level of experience, can achieve excellence in their craft.
                Through our dedication to innovation and customer satisfaction,
                we aim to be the premier choice for welding professionals
                worldwide.
              </p>
            </div>
          </div>
        </div>

        <div className="company-intro">
          <div className="company-text">
            <h2>Our Vision</h2>
            <div className="ptag">
              <p>
                We are committed to delivering products of the highest quality
                that meet the needs of our customers. Honesty and transparency
                are at the core of everything we do. Our customers are our
                priority, and we go above and beyond to exceed their
                expectations.
              </p>
            </div>
          </div>
          <div className="vision-image">
            <img src={values} alt="" />
          </div>
        </div>
      </div>

      <div className="team">
        <h1>Meet the Team</h1>
        <div className="meet-team">
          <div className="theteam">
            <img src={director} alt="" />
            <h2>G. R. Patel</h2>
            <h5>Director</h5>
            <p>0726102499</p>
          </div>
          <div className="theteam">
            <img src={assidir} alt="" />
            <h2>Anil K. Patel</h2>
            <h5>Assistant Director</h5>
            <p>0726817392</p>
          </div>
          <div className="theteam">
            <img src={ceo} alt="" />
            <h2>Dan Ogutu</h2>
            <h5>Sales</h5>
            <p>0721669353</p>
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

export default Aboutus
