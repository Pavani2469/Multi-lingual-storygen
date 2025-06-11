import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';
import '../styles/common.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">AI Story Generator</h1>
      <p className="landing-subtitle">Unleash your creativity with powerful AI tools</p>
      <Link to="/signup" className="landing-get-started">Get Started</Link>
      <div className="landing-signin-link">
        or <Link to="/signin">sign in to your account</Link>
      </div>
    </div>
  );
};

export default Landing;
