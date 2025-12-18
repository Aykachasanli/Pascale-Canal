import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchProductById,
  clearSelectedProduct,
} from "../../../store/homeSlice";
import { openModal } from "../../../store/modalSlice";
import CustomSection from "../../../components/CustomSection";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedProduct, loading } = useAppSelector((state) => state.home);


  const IMAGE_BASE_URL =
    import.meta.env.VITE_IMAGE_URL || "http://localhost:8000/";

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  const handleOpenModal = () => {
    if (selectedProduct) {
      const initialItem: any = {
        artworkId: selectedProduct._id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        imageUrl: `${IMAGE_BASE_URL}${selectedProduct.productImage}`,
        selectedFormat: {
          name: "Œuvre originale",
          price: selectedProduct.price,
          type: "original" as const,
        },
        quantity: 1,
      };
      dispatch(openModal({ product: initialItem }));
    }
  };

  const handleShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.location.href = `mailto:?subject=Check this out&body=${url}`;
  };

  if (loading && !selectedProduct) {
    return <div className="loading-state">Loading product details...</div>;
  }

  if (!selectedProduct) return null;

  return (
    <CustomSection className="details-page">
<div className="container">
  <div className="row">
          <div className="details-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="header-content">
          <h1 className="product-name">{selectedProduct.name}</h1>
          <p className="author">
            peint par <span>{selectedProduct.author || "Pascale Canal"}</span>
          </p>
        </div>
      </div>

      <section className="details-content">
        <div className="image-side">
          <img
            src={`${IMAGE_BASE_URL}${selectedProduct.productImage}`}
            alt={selectedProduct.name}
          />
        </div>

        <div className="info-side">
          <div className="format">
            <h2>Choose the format</h2>
            <div className="option active">
              <div>

                <span>Original painting</span>
              </div>
              <p>{selectedProduct.price} $</p>
            </div>
          </div>

          <div className="details">
            <h2>Details</h2>

             {selectedProduct.details && (
              <p className="product-description">{selectedProduct.details}</p>
            )}
            <p>
              <strong>Price:</strong> {selectedProduct.price} $
            </p>
            {selectedProduct.dimensions && (
              <p>
                <strong>Dimensions:</strong> {selectedProduct.dimensions}
              </p>
            )}
            {selectedProduct.technique && (
              <p>
                <strong>Technique:</strong> {selectedProduct.technique}
              </p>
            )}
            {selectedProduct.creationDate && (
              <p>
                <strong>Creation date:</strong> {selectedProduct.creationDate}
              </p>
            )}
          </div>

          <div className="actions">
            <button className="buy-btn" onClick={handleOpenModal}>
              Contact us to purchase
            </button>
            <button className="share-btn" onClick={handleShare}>
                Share
            </button>
          </div>
        </div>
      </section>
  </div>
</div>
    </CustomSection>
  );
};

export default Details;
