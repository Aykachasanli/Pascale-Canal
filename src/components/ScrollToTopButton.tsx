import React, { useState } from "react";
// SCSS faylını import etməyi unutmayın


/**
 * Axtarış sahəsi və səhifənin yuxarısına qayıtmaq üçün düyməni ehtiva edən
 * bütün səhifələrdə görünəcək sabit komponent.
 */
const SearchAndScrollFixed: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Səhifəni yuxarıya (0, 0 koordinatına) hamar şəkildə atır.
   */
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  /**
   * Axtarış funksionallığını yerinə yetirir (əlavə olaraq implementasiya edilməlidir).
   */
  const handleSearch = () => {
    // Axtarış məntiqini bura əlavə edin
    console.log("Axtarış edilir:", searchTerm);
  };

  // Input sahəsində 'Enter' basıldığında axtarış etmək üçün
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="fixed-search-bar">
      <div className="content-wrapper">
        
        {/* Sol tərəfdəki loqo/simvol */}
        <div className="logo">
          PK
        </div>

        {/* Axtarış Sahəsi */}
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search for a table..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Back to top düyməsi */}
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