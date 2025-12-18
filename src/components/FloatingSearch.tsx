import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import logo from "../assets/images/logo-reversed.avif"; 

const FloatingSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const products = useAppSelector((state) => state.home.products);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);


  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  const handleProductClick = (id: string) => {
    navigate(`/details/${id}`);
    setSearchTerm("");
    setShowResults(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredProducts.length > 0) {
      handleProductClick(filteredProducts[0]._id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="floating-search-container" ref={searchRef}>
      <div className="floating-bar">
        <div className="logo-icon">
             <img src={logo} alt="Pascale" />
        </div>
        
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search for a table..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm.length > 0 && setShowResults(true)}
          />
        </div>

        <button className="back-to-top" onClick={scrollToTop}>
          Back to top
        </button>
      </div>

      {showResults && filteredProducts.length > 0 && (
        <div className="search-results">
            {filteredProducts.map((product) => (
              <div 
                key={product._id} 
                className="search-result-item"
                onClick={() => handleProductClick(product._id)}
              >
                  <img src={`${import.meta.env.VITE_IMAGE_URL}${product.productImage}`} alt={product.name} />
                  <span>{product.name}</span>
              </div>
            ))}
        </div>
      )}
      
      {showResults && filteredProducts.length === 0 && (
           <div className="search-results">
              <div className="no-result-item">No artworks found</div>
           </div>
      )}
    </div>
  );
};

export default FloatingSearch;
