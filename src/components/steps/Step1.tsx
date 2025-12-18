import React, { useState } from "react";
import {
  goToNextStep,
  toggleRelatedArtwork,
} from "../../store/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { ModalProductItem } from "../../store/modalSlice";
import { useHomeProvider } from "../../Modules/Home/Provider/HomeProvider";

interface Step1Props {
  product: ModalProductItem;
}

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;

const Step1: React.FC<Step1Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { products, loading } = useHomeProvider();
  

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const relatedProducts = products
    .filter((item) => item._id !== product.artworkId)
    .slice(0, 9);
  const totalImages = relatedProducts.length + 1;
  const isImagesLoading = imagesLoaded < totalImages;

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };



  const handleNext = () => {
    dispatch(goToNextStep());
  };

  const selected = useAppSelector(
    (state) => state.modal.selectedRelatedArtworks
  );

  const isSelected = (artId: string) =>
    selected.some((item) => item.artworkId === artId);

  const handleToggle = (item: any) => {
    const formatted: ModalProductItem = {
      artworkId: item._id,
      name: item.name,
      price: item.price,
      imageUrl: IMAGE_BASE_URL + item.productImage,
      selectedFormat: {
        name: "Œuvre originale",
        price: item.price,
        type: "original",
      },
      quantity: 1,
    };

    dispatch(toggleRelatedArtwork(formatted));
  };

  if (loading) {
    return (
      <div className="step-content step-1 step-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading artworks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`step-content step-1 ${isImagesLoading ? 'images-loading' : ''}`}>
      {isImagesLoading && (
        <div className="loading-overlay">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading images...</p>
          </div>
        </div>
      )}
      <div className="step-1-grid">
        <div className="left-side">
          <div className="artwork-display">
            
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              onLoad={handleImageLoad}
              onError={handleImageLoad}
            />
            <div className="artwork-info">
              <span className="name">{product.name}</span>
              <span className="price">{product.price} $</span>
            </div>
          </div>
        </div>

        <div className="right-side">
          <h3>Are you interested in other works?</h3>

          <div className="related-artworks-list">
            {relatedProducts.map((item) => (
            
              <div
                key={item._id}
                onClick={() => handleToggle(item)}
                className={`related-artwork-item ${
                  isSelected(item._id) ? "selected" : ""
                }`}
              >
                <img
                  src={`${IMAGE_BASE_URL}${item.productImage}`}
                  alt={item.name}
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                />
                <span className="artwork-title">{item.name}</span>
              </div>

               
            ))}
          </div>


        </div>
      </div>

      <div className="step-1-footer">
        <button
          className="suivante-btn"
          onClick={() => {
            handleNext();
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Step1;
