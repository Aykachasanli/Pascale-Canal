
import React, { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectModalState } from '../../store/modalSlice';
import type { SelectedArtwork } from '../../types/modalTypes'; 
const Step3_Summary: React.FC = () => {
    const { cartItems } = useAppSelector(selectModalState);

    const totalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    }, [cartItems]);

    const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;

    const CartItemSummary: React.FC<{ item: SelectedArtwork }> = ({ item }) => (
        <div className="summary-item">
            <div className="item-header">
                <img src={`${IMAGE_BASE_URL}${item.imageUrl}`} alt={item.name} className="item-thumb" />
                <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-format">
                        {item.selectedFormat.name} 
                        {item.selectedFormat.type === 'original' ? ' (Œuvre originale)' : ''}
                    </p>
                    <p className="item-price-detail">{item.price.toFixed(2)} €</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="step-content step-3">
            <h3 className="step-title">Résumé de votre commande</h3>
            
            <div className="summary-total-price">
                <p>Prix total</p>
                <h1>{totalPrice.toFixed(2)} €</h1>
            </div>

            <div className="summary-cart-items">
                {cartItems.map((item) => (
                    <CartItemSummary key={item.artworkId} item={item} />
                ))}
            </div>
            
        </div>
    );
};

export default Step3_Summary;