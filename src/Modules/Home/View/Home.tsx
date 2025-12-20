import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useHomeProvider } from "../Provider/HomeProvider";
import CustomSection from "../../../components/CustomSection";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;


const ImmortalizeBanner: React.FC = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/personal");
  };

  return (
    <div className="immortalize-banner">
      <div className="banner-content">
       
        <h2>Immortalize your memory in a unique painting</h2>
        <p>
          Transform your photographs into unique paintings. A lasting memory,
          tailored to your taste.
        </p>
      </div>
      <button className="order-button" onClick={handleOrderClick}>
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
              <span>{product.price} $</span>
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
            <motion.h1 
              className="title"

              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Pascale <span>Canal</span>
              <motion.span 
                className="badge"
                style={{ 
                  display: 'inline-block',
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              >
                FRENCH PAINTER
              </motion.span>
            </motion.h1>

            <motion.p 
              className="subtitle"

              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Visit my e-gallery
            </motion.p>
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