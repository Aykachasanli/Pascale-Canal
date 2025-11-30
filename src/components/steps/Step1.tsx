import React from "react";
import { updateSelectedFormat, goToNextStep,  } from "../../store/modalSlice";
import { useAppDispatch } from "../../store/hooks";
import type { ModalProductItem } from "../../store/modalSlice";

interface Step1Props {
  product: ModalProductItem;
}

const Step1: React.FC<Step1Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const availableFormats = [
    {
      name: "Œuvre originale",
      price: product.price,
      type: "original" as const,
      isAvailable: true,
      tag: "Unique",
    },
  ];

  const handleFormatChange = (format: (typeof availableFormats)[number]) => {
    dispatch(updateSelectedFormat(format));
  };

  const handleNext = () => {
    dispatch(goToNextStep());
  };

  return (
    <div className="step-content step-1">
      <div className="step-1-grid">
        <div className="left-side">
          <div className="artwork-display">
            <img src={product.imageUrl} alt={product.name} />
            <div className="artwork-info">
              <span className="name">{product.name}</span>
              <span className="price">{product.price} €</span>
            </div>
          </div>

          {/* <div className="format-selection">
            <h3>Choose the format</h3>
            {availableFormats.map((format, index) => (
              <div
                key={index}
                className={`format-option ${
                  product.selectedFormat.type === format.type ? "selected" : ""
                }`}
                onClick={() => handleFormatChange(format)}
              >
                <div className="option-details">
                  <input
                    type="radio"
                    name="format"
                    checked={product.selectedFormat.type === format.type}
                    readOnly
                  />
                  <span>{format.name}</span>
                  {format.tag && <span className="tag">{format.tag}</span>}
                </div>
                <p className="price-tag">{format.price} €</p>
              </div>
            ))}
          </div> */}
        </div>

        <div className="right-side">
          <h3>D'autres œuvres vous intéressent?</h3>

          <div className="related-artworks-list">
            {[
              { id: 1, title: "Nanuk", img: "placeholder1.jpg" },
              { id: 2, title: "Regard d'ombre", img: "placeholder2.jpg" },
              { id: 3, title: "Orival", img: "placeholder3.jpg" },
              { id: 4, title: "Another", img: "placeholder4.jpg" },
            ].map((item) => (
              <div key={item.id} className="related-artwork-item">
                <img src={`/assets/images/${item.img}`} alt={item.title} />
                <span className="artwork-title">{item.title}</span>
              </div>
            ))}
          </div>

          <button className="view-all-btn">Voir toutes les œuvres</button>
        </div>
      </div>

      <div className="step-1-footer">
        <button className="suivante-btn" onClick={handleNext}>
          Suivant →
        </button>
      </div>
    </div>
  );
};

export default Step1;
