
import React from 'react';



const SuccessScreen: React.FC = () => {
   

    return (
        <div className="step-content success-screen">
            <div className="success-icon-container">
                <span className="success-icon">✓</span>
            </div>
            
            <h3 className="success-message-title">Message envoyé avec succès!</h3>
            <p className="success-message-info">
                Je vous répondrai dans les plus brefs délais.
            </p>
        </div>
    );
};

export default SuccessScreen;