import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import "./Descriptions.css";
import { isUserLoggedIn } from "../authUtils";
import QuoteRequestForm from "./QuoteRequestForm";

const Descriptions = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const { productId } = useParams();
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
         const docRef = doc(db, "images", productId);
         const docSnap = await getDoc(docRef);

         if (docSnap.exists()) {
          const productData = { id: docSnap.id, ...docSnap.data() };
          setProduct(productData);
         }
         else {
          console.log("No product found with ID: ", productId);
          setError(`No product found with ID: ${productId}`);
         }
       } catch (error) {
         console.error("Error fetching product data: ", error);
         setError(`Error fetching product data: ${error.message}`);
       } finally {
         setLoading(false);
       }
     };

     fetchProduct();
   }, [productId, db]);

  const handleQuoteRequest = () => {
    if (isUserLoggedIn()) {
      setShowQuoteForm(true);
    } else {
      alert("Please log in to request a quote");
    }
  };

  const handleQuoteSubmit = async (quoteData) => {
    try {
      const quotesRef = collection(db, 'Quotes');
      await addDoc(quotesRef, {
        ...quoteData,
        productId: productId,
        timestamp: serverTimestamp(),
      });

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
