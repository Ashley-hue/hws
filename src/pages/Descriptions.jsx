import React from 'react'
import { useLocation } from 'react-router-dom';
import "./Descriptions.css"

const Descriptions = () => {
    const location = useLocation();
    const { image, name, details } = location.state || {};
  return (
    <div className="description-container">
      <div className='description-items'>
        <div className="image-section">
          <img src={image} alt={name} className="grandiose" />
        </div>
        <div className="text-section">
          <h1>{name}</h1>
          <ul>
            {details && details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <button className="btn"> Request For Quote</button>
        </div>
      </div>
    </div>
  );
}

export default Descriptions
