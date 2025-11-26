import React from "react";
// Əgər Redux-dan məlumat çəkmək lazımdırsa (məsələn, qiymət, əsər adı)
// import { useSelector } from "react-redux";
// import type { RootState } from "../../store/store";

// Bu şəkil placeholder'ı əslində əsərin URL-i olmalıdır, 
// lakin hazırda sadə bir placeholder kimi istifadə edirik.
// Tutaq ki, sizdə bu şəklin URL-i var.
const artworkImageUrl = "/images/paysage-aubrac-thumbnail.jpg"; 

const Step2_Summary: React.FC = () => {
  // Əgər qiymət dinamik olaraq Redux-dan gəlirsə:
  // const artworkPrice = useSelector((state: RootState) => state.artwork.selectedPrice); 
  // const artworkName = useSelector((state: RootState) => state.artwork.selectedName);
  
  // Hazırda isə, placeholder dəyərlərdən istifadə edirik
  const artworkPrice = "200.00 €";
  const artworkName = "Paysage Aubrac";
  
  return (
    <div className="step-2-summary">
      
      {/* Şəkildəki əsas başlıq */}
      <h2 className="summary-title">Résumé de votre commande</h2>

      {/* Ümumi Qiymət Bloku (sarı fonda) */}
      <div className="price-total-box">
        <p className="price-label">Prix total</p>
        <p className="price-amount">{artworkPrice}</p>
      </div>

      {/* Sifariş edilən əsərin detalları */}
      <div className="artwork-detail-box">
        
        {/* Əsərin miniatür şəkli */}
        <div className="artwork-image-container">
          {/* Real tətbiqdə bu Image komponenti və ya img tagı olmalıdır */}
          <img src={artworkImageUrl} alt={artworkName} className="artwork-thumbnail" />
        </div>
        
        {/* Əsərin adı və qiyməti */}
        <div className="artwork-info">
          <p className="artwork-name">{artworkName}</p>
          <p className="artwork-description">Œuvre originale - {artworkPrice}</p>
        </div>
      </div>
      
      {/* Qeyd: Bu komponent yalnız kontenti təmin edir. 
          "Précédent" və "Suivant" düymələri əsas BuyArtworkModal-da idarə olunur. */}
    </div>
  );
};

export default Step2_Summary;