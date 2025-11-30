
import React from "react";

const CustomSection: React.FC<
  React.PropsWithChildren<{ className: string }>
> = ({ children, className }) => (
  <section className={className}>{children}</section>
);

const IMAGE_URLS = [
  "/src/assets/images/anime1.jpg",
  "/src/assets/images/anime2.jpg",
  "/src/assets/images/anime3.jpg",
  "/src/assets/images/anime4.jpg",
  "/src/assets/images/anime5.jpg",
  "/src/assets/images/anime6.jpg",
];

// Fasiləsiz döngü effekti üçün şəkilləri təkrarlayırıq (3 dəfə)
const SLIDER_IMAGES_TOP = [...IMAGE_URLS, ...IMAGE_URLS, ...IMAGE_URLS];
// Alt cərgə üçün fərqli başlanğıc nöqtəsi
const SLIDER_IMAGES_BOTTOM = [
  ...IMAGE_URLS.slice(2),
  ...IMAGE_URLS.slice(2),
  ...IMAGE_URLS.slice(2),
];

const Personal: React.FC = () => {
  return (
    <CustomSection className="personal">
      <div className="container">
        <div className="row">
          <div className="top">
            <h2 className="title">Order personalized</h2>
            <p className="info">
              The works shown below are examples of custom creations
            </p>
          </div>
        </div>
        <div className="alone">
          <p className="info">
            Order a unique work of art that reflects your personality. Whether
            it's your pet, a cherished landscape, or a portrait.
          </p>
        </div>
      </div>

      <div className="scrolling-showcase">
        <div className="track track-top track-group">
          {SLIDER_IMAGES_TOP.map((url, index) => (
            <div key={`top-${index}`} className="slide slide-top-hover">
              <img
                src={url}
                alt={`Özəl Sənət Əsəri Nümunəsi ${index}`}
                loading="lazy"
                className="slide-image"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/400x300/333333/ffffff?text=Placeholder+Image";
                }}
              />
            </div>
          ))}
        </div>

        <div className="track track-bottom track-group">
          {SLIDER_IMAGES_BOTTOM.map((url, index) => (
            <div key={`bottom-${index}`} className="slide slide-bottom-hover">
              <img
                src={url}
                alt={`Özəl Sənət Əsəri Nümunəsi ${index}`}
                loading="lazy"
                className="slide-image"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/400x300/333333/ffffff?text=Placeholder+Image";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </CustomSection>
  );
};

export default Personal;
