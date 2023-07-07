import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [mealSuggestions, setMealSuggestions] = useState([]);

  const handleInputChange = (e) => {
    setIngredients(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You: ' + ingredients },
            { role: 'system', content: 'You: What can I cook with these ingredients?' },
          ],
        }),
      });

      const data = await response.json();

      const suggestions = data.choices.map((choice) => choice.message.content);
      setMealSuggestions(suggestions);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Recipe Muse</h1>
      <form onSubmit={handleSubmit}>
        <label className="ingredients-label">
          Ingredients:
          <textarea
            rows="4"
            value={ingredients}
            onChange={handleInputChange}
            placeholder="Enter your ingredients"
            className="ingredients-textarea"
          />
        </label>
        <button type="submit" className="submit-button">Get Meal Suggestions</button>
      </form>
      <div className="result-box">
        <h2 className="result-title">Meal Suggestions:</h2>
        {mealSuggestions.length > 0 ? (
          <ul className="result-list">
            {mealSuggestions.map((suggestion, index) => (
              <li key={index} className="result-item">{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p className="no-suggestions">No meal suggestions found.</p>
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
