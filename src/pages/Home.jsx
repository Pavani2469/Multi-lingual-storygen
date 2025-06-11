import React from 'react';
import '../styles/home.css';
import '../styles/common.css';

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="home-title">Welcome to Story Generator</h2>
      <p className="home-description">
        Our tool allows you to generate creative stories based on your custom prompts.
        Choose a genre, set the word count, and let the magic happen!
      </p>
    </div>
  );
};

export default Home;
