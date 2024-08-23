import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './QuoteRequestForm.css';

const QuoteRequestForm = ({ productName, onSubmit, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const db = getFirestore();
                const userRef = doc(db, 'Users', user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    setName(userData.name || '');
                    setEmail(userData.email || '');
                    setPhone(userData.phone || '');
                }
            }
        };
        fetchUserData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, email, phone, productName, message });
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
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Additional details or questions"
        ></textarea>
        <button type="submit">Send Quote Request</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default QuoteRequestForm
