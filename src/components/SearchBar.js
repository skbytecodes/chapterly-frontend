import React, { useState } from 'react';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Mock data for suggestions (replace with actual data fetched from API)
  // const suggestions = [
  //   { label: 'Product 1' },
  //   { label: 'Product 2' },
  //   { label: 'Product 3' },
  //   // Add more suggestions as needed
  // ];

  // Function to handle input change
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Simulated API call to fetch suggestions
    fetchSuggestions(value);
  };

  // Function to fetch suggestions from API (simulated)
  const fetchSuggestions = (query) => {
    // Simulated API call
    // Replace this with actual API call to fetch suggestions
    // Example: fetch(`/api/search?q=${query}`)
    const mockData = [
      { label: 'Product 1' },
      { label: 'Product 2' },
      { label: 'Product 3' },
      // Add more suggestions as needed
    ];
    setSuggestions(mockData.filter(item => item.label.toLowerCase().includes(query.toLowerCase())));
  };

  // Function to handle suggestion selection
  const handleSuggestionClick = (product) => {
    setInputValue(product.label);
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="Search Products"
        value={inputValue}
        onChange={handleInputChange}
        style={{ width: '100%' }}
      />
      <ul style={{ position: 'absolute', width: '100%', marginTop: '8px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', padding: '0', listStyle: 'none', zIndex: '999' }}>
        {suggestions.map((product, index) => (
          <li key={index} onClick={() => handleSuggestionClick(product)} style={{ padding: '8px', cursor: 'pointer' }}>
            {product.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
