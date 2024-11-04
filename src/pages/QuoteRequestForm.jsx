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

const QuoteRequestForm = ({ productName, onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [quantityErr, setQuantityErr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setName(userData.name || "");
          setEmail(userData.email || "");
          setPhone(userData.phone || "");
        }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User must be logged in to submit a quote");
      }

      const quoteData = {
        userId: user.uid,
        name,
        email,
        phone,
        productName,
        message,
        quantity,
        status: "pending",
        createdAt: serverTimestamp(),
        adminNotified: false,
      };

      await addDoc(collection(db, "Quotes"), quoteData);

      const templateParams = {
        from_name: name,
        product_name: productName,
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
      alert("Error submitting quote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="quote-request-form">
      <h2>Request a Quote for {productName}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
