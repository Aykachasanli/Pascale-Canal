import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useHomeProvider } from "../Provider/HomeProvider";
import CustomSection from "../../../components/CustomSection";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;

// Şəkildəki banner hissəsi üçün komponent
const ImmortalizeBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    // Bütün banner tıklanabilir olacaq
    <div
      className="immortalize-banner"
      onClick={() => navigate("/personal")}
    >
      <div className="banner-content">
        <span className="novelty-tag">NOVELTY</span>
        <h2>Immortalize your memory in a unique painting</h2>
        <p>
          Transform your photographs into unique paintings. A lasting memory,
          tailored to your taste.
        </p>
      </div>
      <button className="order-button">
        Order your painting <span className="arrow">→</span>
      </button>
    </div>
  );
};

const Home: React.FC = () => {
  const { products, loading, error } = useHomeProvider();
  const navigate = useNavigate();

  const content = useMemo(() => {
    if (loading) {
      return <div className="loading-state">Məhsullar yüklənir...</div>;
    }
    if (error) {
      return <div className="error-state">Xəta: {error}</div>;
    }
    if (products.length === 0) {
      return <div className="empty-state">Hələ heç bir əsər yoxdur.</div>;
    }

    return (
      <div className="gallery">
        {products.map((product) => (
          <div
            key={product._id}
            className="gallery_item"
            onClick={() => navigate(`/details/${product._id}`)}
          >
            <img
              src={`${IMAGE_BASE_URL}${product.productImage}`}
              alt={product.name}
            />
            <div className="title">
              <h3>{product.name}</h3>
              <span>{product.price} €</span>
            </div>
          </div>
        ))}
      </div>
    );
  }, [products, loading, error, navigate]);

  return (
    <CustomSection className="home">
      <div className="container">
        <div className="row">
          <div className="content">
            <h1 className="title">
              Pascale <span>Canal</span>
              <span className="badge">FRENCH PAINTER</span>
            </h1>
            <p className="subtitle">Visit my e-gallery</p>
          </div>

          {content}

          <div className="col-12">
            <ImmortalizeBanner />
          </div>
        </div>
      </div>
    </CustomSection>
  );
};

export default Home;
