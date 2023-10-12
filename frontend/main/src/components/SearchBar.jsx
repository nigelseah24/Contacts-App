import React, { useState, useEffect } from 'react';

export default function SearchBar({ sortedContacts, setFilteredContacts, searchQuery, updateSearchQuery }) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase(); // Convert input to lowercase
    setLocalSearchQuery(event.target.value); // Set the input value as-is in the input field
    updateSearchQuery(query); // Update the search query in the parent component (App.jsx)

    // Filter the sortedContacts based on the lowercase search query
    const filteredContacts = sortedContacts.filter((contact) =>
      contact.name.toLowerCase().includes(query)
    );

    // Update the filtered contacts in the parent component (App.jsx)
    setFilteredContacts(filteredContacts);
  };

  useEffect(() => {
    // When the searchQuery prop changes (e.g., when returning from ContactCard), update the local search query
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={localSearchQuery}
        onChange={handleSearch}
      />
    </div>
  );
}
