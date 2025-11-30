
import React from "react";
import ReactDOM from "react-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {closeModal, goToNextStep, goToPreviousStep} from "../store/modalSlice";
import Step1_ArtworkSelection from "./steps/Step1";
import Step2_FormatSelection from "./steps/Step2";
import Step3_Summary from "./steps/Step3";
import Step4_Coordinates from "./steps/Step4";

const BuyArtworkModal: React.FC = () => {
  const { isOpen, currentStep, product } = useAppSelector(
    (state) => state.modal
  );
  const dispatch = useAppDispatch();

  if (!isOpen || !product) return null;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1_ArtworkSelection product={product} />;
      case 2:
        return <Step2_FormatSelection />;
      case 3:
        return <Step3_Summary />;
      case 4:
        return <Step4_Coordinates />;
      default:
        return <Step1_ArtworkSelection product={product} />;
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  const steps = [
    { id: 1, label: "Artwork" },
    { id: 2, label: "Summary" },
    { id: 3, label: "Coordinates" },
    { id: 4, label: "Payment" },
  ];

  const isNavigationVisible = currentStep > 1 && currentStep < 4;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleClose}>
      <div className="buy-artwork-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Purchase request</h2>
          <p>
            Are you interested in purchasing "{product.name}"? Fill out this
            form and I will contact you shortly to discuss the details.
          </p>
          <button className="close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="step-bar">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`step-item ${
                currentStep === step.id ? "active" : ""
              } ${currentStep > step.id ? "completed" : ""}`}
            >
              <div className="step-number">{step.id}</div>
              <div className="step-label">{step.label}</div>
            </div>
          ))}
        </div>

        <div className="modal-content">{renderStepContent()}</div>

        {isNavigationVisible && (
          <div className="modal-footer">
            <button
              className="back-btn"
              onClick={() => dispatch(goToPreviousStep())}
            >
              ← Back
            </button>
            <button
              className="next-btn"
              onClick={() => dispatch(goToNextStep())}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>,
    modalRoot
  );
};

export default BuyArtworkModal;
