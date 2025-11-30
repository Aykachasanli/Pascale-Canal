import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks'; 
import { goToNextStep } from '../../store/modalSlice'; 


const Step2: React.FC = () => {
    const dispatch = useAppDispatch();
    
    const product = useAppSelector((state) => state.modal.product);
    const selectedFormat = product?.selectedFormat; 

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '', city: '', country: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(goToNextStep());
    };
    
    if (!product || !selectedFormat) return null; 

    return (
        <div className="step-content step-2">
            <form onSubmit={handleSubmit} className="step-2-grid">
                
              
                <div className="order-summary">
                    <h3>Résumé de votre commande</h3>
                    
                    <div className="total-price-block">
                        <p>Prix total</p>
                        <span className="price-value">{selectedFormat.price}.00 €</span>
                    </div>

                    <div className="artwork-details-block">
                        <div className="artwork-info-row">
                            <img src={product.imageUrl} alt={product.name} />
                            <div className="text-info">
                                <span className="artwork-name">{product.name}</span>
                                <span className="artwork-format">{selectedFormat.name} - {selectedFormat.price} €</span>
                            </div>
                        </div>
                    </div>
                    
                    <button className="suivante-btn" type="submit">
                        Suivant →
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step2;