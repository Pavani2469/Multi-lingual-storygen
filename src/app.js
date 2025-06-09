import React, { useState } from 'react';

function App() {
  const [story, setStory] = useState('');

  const generateStory = async () => {
    const keywords = ['magic', 'forest', 'dragon'];
    const response = await fetch('http://127.0.0.1:8000/generate_story/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keywords,
        max_length: 300,
        language: 'en',
      }),
    });
    const data = await response.json();
    setStory(data.story);
  };

  return (
    <div>
      <h1>Story Generator</h1>
      <button onClick={generateStory}>Generate</button>
      <p>{story}</p>
    </div>
  );
}

export default App;
