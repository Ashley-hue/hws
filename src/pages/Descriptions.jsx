import React, {useState} from 'react'
import { useLocation} from 'react-router-dom';
import "./Descriptions.css"
import { isUserLoggedIn } from '../authUtils';
import QuoteRequestForm from './QuoteRequestForm';

const Descriptions = () => {
    const location = useLocation();
    const { image, name, details } = location.state || {};
    const [showQuoteForm, setShowQuoteForm] = useState(false);

    const handleQuoteRequest = () => {
      if (isUserLoggedIn()) {
        setShowQuoteForm(true);
      }
      else {
        alert("Please log in to request a quote");
      }
    }
    const handleQuoteSubmit = async (quoteData) => {
      try {
        const response = await fetch("http://localhost:5000/send-quote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quoteData),
        });

        if (!response.ok) {
          throw new Error("Failed to send quote request");
        }

        setShowQuoteForm(false);
        alert("Quote request sent successfully!");
      } catch (error) {
        console.error("Error sending quote request:", error);
        if(error.response && error.response.status === 401){
          alert("Please log in to send a quote request");
        }
        else{
          alert("Failed to send quote request. Please try again.");
        }
        
      }
    };
    
  return (
    <div className="description-container">
      <div className="description-items">
        <div className="image-section">
          <img src={image} alt={name} className="grandiose" />
        </div>
        <div className="text-section">
          <h1>{name}</h1>
          <ul>
            {details &&
              details.map((detail, index) => <li key={index}>{detail}</li>)}
          </ul>
          <button className="btn" onClick={handleQuoteRequest}>
            {" "}
            Request For Quote
          </button>
        </div>
      </div>
      {showQuoteForm && (
        <QuoteRequestForm
          productName={name}
          onSubmit={handleQuoteSubmit}
          onClose={() => setShowQuoteForm(false)}
        />
      )}
    </div>
  );
}

export default Descriptions
