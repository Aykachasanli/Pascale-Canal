import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const bgColorsForPath = ["/"];

export const CircleOverlay = () => {
  const path = useLocation();
  const isBlackBg = bgColorsForPath.includes(path?.pathname);

  const animationVariants = {
    initial: { scaleX: 1.5, scaleY: 1.5, y: "-100%" },
    animate: { scaleX: 1.5, scaleY: 1.5, y: "100%" },
    exit: { scale: 0, y: "100%" }
  };

  return (
    <motion.div
      variants={animationVariants} 
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 3, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh", 
        borderBottomLeftRadius: "50%",
        borderBottomRightRadius: "50%",
        background: isBlackBg ? "black" : "white",
        zIndex: 9999,
        pointerEvents: "none",
        transformOrigin: "top center",
      }}
    />
  );
};