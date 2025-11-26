import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectModalState, updateMessage, togglePrivacy } from '../../store/modalSlice';

const Step5_Message: React.FC = () => {
    const dispatch = useAppDispatch();
    const { userMessage, privacyAccepted } = useAppSelector(selectModalState);

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateMessage(e.target.value));
    };

    return (
        <div className="step-content step-5">
            <h3 className="step-title">Votre message</h3>
            
            <textarea 
                className="message-textarea"
                rows={10}
                value={userMessage}
                onChange={handleMessageChange}
                placeholder="Votre message..."
            />

            <div className="privacy-checkbox-container">
                <input 
                    type="checkbox" 
                    id="privacy-agree" 
                    checked={privacyAccepted}
                    onChange={() => dispatch(togglePrivacy())}
                />
                <label htmlFor="privacy-agree">
                    J'accepte l'utilisation de mes données personnelles pour le traitement de ma demande et pour être recontacté(e)*
                </label>
            </div>
            
        </div>
    );
};

export default Step5_Message;