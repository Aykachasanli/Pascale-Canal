import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import type { RootState } from "../../store/store";

const IMAGE_BASE_URL =
  import.meta.env.VITE_IMAGE_URL || "http://localhost:8000/";

const getAbsoluteImageUrl = (relativePath: string) => {
  if (!relativePath) return "";
  if (relativePath.startsWith("http")) return relativePath;

  return `${IMAGE_BASE_URL.replace(/\/$/, "")}/${relativePath.replace(
    /^\//,
    ""
  )}`;
};

const selectSelectedProduct = (state: RootState) => state.home.selectedProduct;
const selectAllProducts = (state: RootState) => state.home.products;
const selectLoading = (state: RootState) => state.home.loading;

const selectHomeState = createSelector(
  [selectSelectedProduct, selectAllProducts, selectLoading],
  (selectedProduct, allProducts, loading) => ({
    selectedProduct,
    allProducts,
    loading,
  })
);

const Step1_ArtworkSelection: React.FC = () => {
  const { selectedProduct, allProducts, loading } =
    useSelector(selectHomeState);

  if (loading && !selectedProduct) {
    return <div className="loading-state">Əsərlər yüklənir...</div>;
  }

  if (!selectedProduct) {
    return <div className="error-state">Zəhmət olmasa bir əsər seçin.</div>;
  }

  const selectedImageUrl = getAbsoluteImageUrl(selectedProduct.productImage);
  const selectedName = selectedProduct.name;
  const selectedPrice = selectedProduct.price.toFixed(2).replace(".", ",");

  const otherArtworks = allProducts.filter(
    (p) => p._id !== selectedProduct._id
  );

  return (
    <div className="step-1-artwork-selection">
      <h2 className="section-title">Œuvre sélectionnée</h2>

      <div className="content-grid">
        {/* Sol Hissə: Seçilmiş Əsər Kartı */}
        <div className="selected-artwork-card">
          <div className="artwork-image-container">
            <img
              src={selectedImageUrl}
              alt={selectedName}
              className="artwork-image"
              onError={() => {}}
            />
          </div>
        </div>

        <div className="other-artworks-section">
          <h3 className="section-subtitle">
            D'autres œuvres vous intéressent?
          </h3>

          <div className="artwork-list">
            {otherArtworks.map((artwork) => (
              <div key={artwork._id} className="artwork-item">
                <div className="artwork-thumbnail-container">
                  <img
                    src={getAbsoluteImageUrl(artwork.productImage)}
                    alt={artwork.name}
                    className="artwork-thumbnail"
                  />
                  <span className="artwork-type-tag">POSTER</span>
                </div>
                <p className="artwork-item-name">{artwork.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1_ArtworkSelection;
