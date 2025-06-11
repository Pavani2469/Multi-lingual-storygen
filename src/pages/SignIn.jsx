import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signin.css';
import '../styles/common.css';

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Normally, validate and authenticate user here
    navigate('/home'); // Redirect to Home page after sign in
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign In</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
};

export default SignIn;
