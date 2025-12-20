import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container" style={{ position: 'fixed', top: 0, left: 0, zIndex: 10000, width: '100vw', height: '100vh', background: '#000' }}>
      <motion.div
        className="not-found-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="not-found-title"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          404
        </motion.h1>
        <motion.p
          className="not-found-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/" className="not-found-home-link">
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
      <div className="not-found-background-glow"></div>
    </div>
  );
};

export default NotFound;
