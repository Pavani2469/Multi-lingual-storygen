import React, { useState } from 'react';
import '../styles/storytool.css';

const StoryTool = () => {
  const [keywords, setKeywords] = useState('');
  const [genre, setGenre] = useState('');
  const [story, setStory] = useState('');

  const generateStory = async () => {
    const response = await fetch('http://127.0.0.1:8000/generate_story/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywords, genre }),
    });
    const data = await response.json();
    setStory(data.story);
  };

  return (
    <div className="storytool-container">
      <h2 className="storytool-title">Enter keywords to generate a story</h2>

      <input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="e.g., dragon, forest, magic"
        className="storytool-input"
      />

      <select value={genre} onChange={(e) => setGenre(e.target.value)} className="storytool-select">
        <option value="">Select Genre</option>
        <option value="Adventure">Adventure</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Science Fiction">Science Fiction (Sci-Fi)</option>
        <option value="Mystery">Mystery</option>
        <option value="Thriller">Thriller</option>
        <option value="Horror">Horror</option>
        <option value="Drama">Drama</option>
        <option value="Romance">Romance</option>
        <option value="Comedy">Comedy</option>
        <option value="Crime">Crime</option>
        <option value="Historical Fiction">Historical Fiction</option>
        <option value="Mythology">Mythology</option>
        <option value="Paranormal">Paranormal</option>
        <option value="Superhero">Superhero</option>
        <option value="Post-Apocalyptic">Post-Apocalyptic</option>
      </select>

      <button onClick={generateStory} className="storytool-button">
        Generate Story
      </button>

      <div className="feature-section">
        <div className="feature-card">🎭 Genre Selection</div>
        <div className="feature-card">✨ Instant AI Magic</div>
      </div>

      {story && (
        <div className="story-output">
          {story}
        </div>
      )}
    </div>
  );
};

export default StoryTool;
