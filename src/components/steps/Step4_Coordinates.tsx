
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectModalState, updateCoordinates } from '../../store/modalSlice';

const Step4_Coordinates: React.FC = () => {
    const dispatch = useAppDispatch();
    const { coordinates } = useAppSelector(selectModalState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(updateCoordinates({ [name]: value }));
    };

    return (
        <div className="step-content step-4">
            <h3 className="step-title">Vos coordonnées</h3>
            
            <div className="form-grid">
                <input 
                    type="text" 
                    name="firstName" 
                    placeholder="Prénom*" 
                    value={coordinates.firstName}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Nom*" 
                    value={coordinates.lastName}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email*" 
                    value={coordinates.email}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Téléphone" 
                    value={coordinates.phone}
                    onChange={handleChange}
                />
            </div>
            
        </div>
    );
};

export default Step4_Coordinates;