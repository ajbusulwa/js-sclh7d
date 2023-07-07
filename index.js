import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [mealSuggestions, setMealSuggestions] = useState([]);

  const handleInputChange = (e) => {
    setIngredients(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make API request to ChatGPT with ingredients
    // Update mealSuggestions state with API response
    // Display meal suggestions on the UI
  };

  return (
    <div className="container">
      <h1 className="title">Recipe Muse</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Ingredients:
          <input
            type="text"
            value={ingredients}
            onChange={handleInputChange}
            placeholder="Enter your ingredients"
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
