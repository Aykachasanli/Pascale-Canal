import React, { useState } from "react";
import { Search, ArrowUp, Menu } from "lucide-react";
import BuyArtworkModal from "./BuyArtworkModal";

const FloatingButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <>
      {/* Floating Button Container */}
      <div className="floating-container">
        <div className="floating-btn" onClick={() => setOpenSearch(!openSearch)}>
          <Search size={22} />
        </div>

        <div className="floating-btn" onClick={() => setOpenModal(true)}>
          <Menu size={22} />
        </div>

        <div
          className="floating-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={22} />
        </div>
      </div>

      {/* Search Bar */}
      {openSearch && (
        <div className="search-bar">
          <input type="text" placeholder="Axtar..." />
        </div>
      )}

      {/* Modal */}
      {openModal && <BuyArtworkModal close={() => setOpenModal(false)} />}
    </>
  );
};

export default FloatingButton;
