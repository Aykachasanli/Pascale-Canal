import React, { useState } from "react";
import logo from "../assets/images/logo-reversed.avif";

const ScrollToTopButton: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = () => {
    if (query.trim() === "") return;
    console.log("Axtar:", query);
    setQuery("");
  };

  return (
    <div className="scroll-top-wrapper">
      {showSearch && (
        <div className="search-box">
          <input
            type="text"
            placeholder="Cədvəl axtar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Axtar</button>
        </div>
      )}

      <button
        className="scroll-top-btn"
        onClick={() => {
          scrollToTop();
          setShowSearch((prev) => !prev); 
        }}
      >
        <img src={logo} alt="Logo" className="scroll-logo" />
        <span>Cədvəl axtar</span>
      </button>
    </div>
  );
};

export default ScrollToTopButton;
