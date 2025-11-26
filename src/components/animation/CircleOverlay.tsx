import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const bgColorsForPath = ["/"];

export const CircleOverlay = () => {
  const path = useLocation();
  const isBlackBg = bgColorsForPath.includes(path?.pathname);

  return (
    <motion.div
      initial={{ scale: 1.5, y: "-100%" }}
      animate={{ scale: 1.5, y: "100%" }}
      exit={{ scale: 0, y: "100%" }}
      transition={{ duration: 3, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vw",
        borderBottomLeftRadius: "50%",
        borderBottomRightRadius: "50%",
        background: isBlackBg ? "black" : "white",
        zIndex: 9999,
        pointerEvents: "none",
        transform: "translateX(0)",
        
      }}
      
    />
  );
};
