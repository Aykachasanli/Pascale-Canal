import React, { useState } from "react";
const SearchAndScrollFixed: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="fixed-search-bar">
      <div className="content-wrapper">
        <div className="logo">
          PK
        </div>

        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search for a table..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          onClick={handleBackToTop}
          className="back-to-top-button"
        >
          Back to top
        </button>
      </div>
    </div>
  );
};

export default SearchAndScrollFixed;