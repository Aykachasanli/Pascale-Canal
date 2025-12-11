import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { goToNextStep } from "../../store/modalSlice";

const Step2: React.FC = () => {
  const dispatch = useAppDispatch();

  const product = useAppSelector((state) => state.modal.product);
  const selectedFormat = product?.selectedFormat;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(goToNextStep());
  };

  const mainProduct = useAppSelector((state) => state.modal.mainProduct);
  const relatedProducts = useAppSelector(
    (state) => state.modal.selectedRelatedArtworks
  );

  // Create full cart list:
  const cartItems = [...(mainProduct ? [mainProduct] : []), ...relatedProducts];

  if (!product || !selectedFormat) return null;

  return (
    <div className="step-content step-2">
      <form onSubmit={handleSubmit} className="step-2-grid">
        <div className="order-summary">
          <h3>Summary of your order</h3>

          <div className="total-price-block">
            <p>Total price</p>
            <span className="price-value">
              {cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)} €
            </span>
          </div>

          <div className="artwork-details-block">
         
            {cartItems.map((item) => (
              <div key={item.artworkId}>
                <img src={item.imageUrl} />
                <div className="info">
                  <p>{item.name}</p>
                <p>{item.price} €</p>
                </div>
              </div>
            ))}
          </div>

        
        </div>
      </form>
    </div>
  );
};

export default Step2;
