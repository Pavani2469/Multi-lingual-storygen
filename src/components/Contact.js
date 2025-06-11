// src/components/Contact.jsx
import React from 'react';
import '../styles/contact.css';
import '../styles/common.css';

const Contact = () => {
  return (
    <div className="center-page">
      <h2>Contact Us</h2>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
