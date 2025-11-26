import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProductById, clearSelectedProduct } from "../../../store/homeSlice"; 
import { openModal } from '../../../store/modalSlice'; 


const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedProduct, loading } = useAppSelector((state) => state.home);

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL || 'http://localhost:8000/';
  
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
                  name: 'Œuvre originale', 
                  price: selectedProduct.price, 
                  type: 'original' as const 
              },
              quantity: 1,
          };
          dispatch(openModal({ product: initialItem }));
      }
  };

  if (loading && !selectedProduct) {
    return <div className="loading-state">Məhsul detalları yüklənir...</div>;
  }
  
  if (!selectedProduct) return null; 

  return (
    <div className="details-page">
      <header className="details-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ←
        </button>
        <h1 className="product-name">{selectedProduct.name}</h1>
        <p className="author">
          painted by <span>{selectedProduct.author || "Pascale Canal"}</span>
        </p>
      </header>

     
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
                <input type="radio" checked readOnly />
                <span>Original painting</span>
                <span className="tag">Unique</span>
              </div>
              <p>{selectedProduct.price} €</p>
            </div>

          </div>

          <div className="details">
            <h2>Details</h2>
            <p>
              <strong>Price:</strong> {selectedProduct.price} €
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
            <button className="share-btn">Share</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Details;