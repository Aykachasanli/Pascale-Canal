import React, { useEffect, useState } from "react";
import {
  updateSelectedFormat,
  goToNextStep,
  toggleRelatedArtwork,
} from "../../store/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { ModalProductItem } from "../../store/modalSlice";
import { useHomeProvider } from "../../Modules/Home/Provider/HomeProvider";

interface Step1Props {
  product: ModalProductItem;
}

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;

const Step1: React.FC<Step1Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useHomeProvider();

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
    console.log(format, "format");
    dispatch(updateSelectedFormat(format));
  };

  const handleNext = () => {
    dispatch(goToNextStep());
  };

  const selected = useAppSelector(
    (state) => state.modal.selectedRelatedArtworks
  );

  const isSelected = (artId: string) =>
    selected.some((item) => item.artworkId === artId);

  const handleToggle = (item: any) => {
    const formatted: ModalProductItem = {
      artworkId: item._id,
      name: item.name,
      price: item.price,
      imageUrl: IMAGE_BASE_URL + item.productImage,
      selectedFormat: {
        name: "Œuvre originale",
        price: item.price,
        type: "original",
      },
      quantity: 1,
    };

    dispatch(toggleRelatedArtwork(formatted));
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
        </div>

        <div className="right-side">
          <h3>D'autres œuvres vous intéressent?</h3>

          <div className="related-artworks-list">
            {products
              .filter((item) => item._id !== product.artworkId)
              .slice(0, 4)
              .map((item) => (
                // <Link to={`details/${item._id}`}>
                <div
                  key={item._id}
                  onClick={() => handleToggle(item)}
                  className={`related-artwork-item ${
                    isSelected(item._id) ? "selected" : ""
                  }`}
                >
                  <img
                    src={`${IMAGE_BASE_URL}${item.productImage}`}
                    alt={item.name}
                  />
                  <span className="artwork-title">{item.name}</span>
                </div>

                // </Link>
              ))}
          </div>

          <button className="view-all-btn">Voir toutes les œuvres</button>
        </div>
      </div>

      <div className="step-1-footer">
        <button
          className="suivante-btn"
          onClick={() => {
            handleNext();
          }}
        >
          Suivant →
        </button>
      </div>
    </div>
  );
};

export default Step1;
