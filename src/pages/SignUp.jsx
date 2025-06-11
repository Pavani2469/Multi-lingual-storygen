import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css';
import '../styles/common.css';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Normally, validate and send signup data here
    navigate('/home'); // Redirect to Home page after sign up
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button onClick={handleSignUp}>Create Account</button>
      </div>
    </div>
  );
};

export default SignUp;
