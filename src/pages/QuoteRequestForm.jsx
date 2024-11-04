import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import emailjs from '@emailjs/browser';
import "./QuoteRequestForm.css";

const QuoteRequestForm = ({ name, onSubmit, onClose }) => {  // Changed from productName to name
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [quantityErr, setQuantityErr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Validate required props
  useEffect(() => {
    if (!name) {
      setError("Product name is required");
      console.error("QuoteRequestForm: name prop is required");
    } else {
      setError("");
    }
  }, [name]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "Users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUserName(userData.name || "");
            setEmail(userData.email || "");
            setPhone(userData.phone || "");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
      }
    };
    fetchUserData();
  }, []);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < 1) {
      setQuantity(1);
      setQuantityErr("Quantity cannot be less than 1");
    } else {
      setQuantity(value);
      setQuantityErr("");
    }
  };

  const validateFormData = () => {
    if (!name) {
      throw new Error("Product name is required");
    }
    if (!userName || !email || !phone || !quantity) {
      throw new Error("All fields are required");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      validateFormData();

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User must be logged in to submit a quote");
      }

      const quoteData = {
        userId: user.uid,
        userName,  // Changed from name to userName to avoid conflict
        email,
        phone,
        name,      // This is the product name
        message,
        quantity,
        status: "pending",
        createdAt: serverTimestamp(),
        adminNotified: false,
      };

      // Validate all required fields in quoteData
      Object.entries(quoteData).forEach(([key, value]) => {
        if (value === undefined) {
          throw new Error(`Missing required field: ${key}`);
        }
      });

      const docRef = await addDoc(collection(db, "Quotes"), quoteData);
      console.log("Quote document written with ID:", docRef.id);

      const templateParams = {
        from_name: userName,
        product_name: name,
        message: message,
        phone: phone,
        quantity: quantity,
        email: email,
        to_name: "Admin"
      };

      await emailjs.send(
        "service_zgshx1g",
        "template_njcev5c",
        templateParams,
        "bWck62oVKMzlyVoa6"
      );

      if (onSubmit) {
        onSubmit(quoteData);
      }

      alert("Quote submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting quote: ", error);
      setError(error.message || "Error submitting quote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!name) {
    return <div className="error-message">Cannot load quote form: Product name is required</div>;
  }

  return (
    <div className="quote-request-form">
      <h2>Request a Quote for {name}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Your Phone"
          required
        />
        <div className="quantity-field">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            required
          />
          {quantityErr && <span className="error-message">{quantityErr}</span>}
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Additional details or questions"
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Quote Request"}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default QuoteRequestForm;