import React, { useState } from 'react';
import ReactDOM from 'react-dom';
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

      // Extract and update mealSuggestions state with the API response data
      setMealSuggestions(data.choices.map((choice) => choice.message.content));

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
      <h2 className="suggestions-title">Meal Suggestions:</h2>
      <ul className="suggestions-list">
        {mealSuggestions.map((suggestion, index) => (
          <li key={index} className="suggestion">{suggestion}</li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
