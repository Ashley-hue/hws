import React from 'react'
import './Aboutus.css'
import backdrop from "../components/Assets/mapareaweld.jpeg";
import companyintro from "../components/Assets/compintro.jpeg";
import ourmission from "../components/Assets/missions.jpeg";
import values from "../components/Assets/ourvalues.jpeg";
import director from "../components/Assets/meetdir.png"
import assidir from "../components/Assets/meetas.png";
import ceo from "../components/Assets/john.png"
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
            <h2>John Gitonga</h2>
            <h5>C.E.O</h5>
            <p>0724621977</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aboutus
