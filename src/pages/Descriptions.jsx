import React, { useState, useEffect } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import "./Descriptions.css";
import { isUserLoggedIn } from "../authUtils";
import QuoteRequestForm from "./QuoteRequestForm";

const Descriptions = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const { productId } = useParams();
  const navigate = useNavigate();
  const db = getFirestore();

   useEffect(() => {
     const fetchProduct = async () => {
       if (!productId) {
         console.error("Product ID is missing from URL");
         setError("Product ID is missing from URL");
         setLoading(false);
         return;
       }

       try {
         console.log("Fetching product with ID:", productId);
         const q = query(
           collection(db, "images"),
           where("id", "==", productId)
         );
         const querySnapshot = await getDocs(q);

         if (!querySnapshot.empty) {
           const productData = querySnapshot.docs[0].data();
           console.log("Product data:", productData);
           setProduct(productData);
         } else {
           console.log("No product found with ID:", productId);
           setError(`No product found with ID: ${productId}`);
           // Optionally, redirect to a 404 page
           // navigate('/404');
         }
       } catch (error) {
         console.error("Error fetching product data: ", error);
         setError(`Error fetching product data: ${error.message}`);
       } finally {
         setLoading(false);
       }
     };

     fetchProduct();
   }, [productId, db, navigate]);

  const handleQuoteRequest = () => {
    if (isUserLoggedIn()) {
      setShowQuoteForm(true);
    } else {
      alert("Please log in to request a quote");
    }
  };

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
      if (error.response && error.response.status === 401) {
        alert("Please log in to send a quote request");
      } else {
        alert("Failed to send quote request. Please try again.");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="description-container">
      <div className="description-items">
        <div className="image-section">
          <img
            src={product.downloadUrl}
            alt={product.name}
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
};

export default Descriptions;
