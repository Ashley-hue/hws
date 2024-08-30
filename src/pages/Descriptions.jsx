import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom';
import "./Descriptions.css"
import { isUserLoggedIn } from '../authUtils';
import QuoteRequestForm from './QuoteRequestForm';

const Descriptions = () => {
    const { productId } = useParams();
    console.log("productId from params:", productId);
    const [ product, setProduct ] = useState(null);
    const [showQuoteForm, setShowQuoteForm] = useState(false);

    useEffect(() => {
      fetch(`http://localhost:5000/api/products/${productId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Received data:", data);
          setProduct(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          // You might want to set some error state here
        });
    }, [productId]);

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
    
    if(!product) return <div>Loading...</div>;

  return (
    <div className="description-container">
      <div className="description-items">
        <div className="image-section">
          <img
            src={product.url}
            alt={product.filename}
            className="grandiose"
          />
        </div>
        <div className="text-section">
          <h1>{product.name}</h1>
          <ul>
            {product.details &&
              product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
          </ul>
          <button className="btn" onClick={handleQuoteRequest}>
            Request For Quote
          </button>
        </div>
      </div>
      {showQuoteForm && (
        <QuoteRequestForm
          productName={product.name}
          onSubmit={handleQuoteSubmit}
          onClose={() => setShowQuoteForm(false)}
        />
      )}
    </div>
  );
}

export default Descriptions
