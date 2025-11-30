import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const bgColorsForPath = ["/"];

export const CircleOverlay = () => {
  const path = useLocation();
  const isBlackBg = bgColorsForPath.includes(path?.pathname);

  // Dəyişiklik: Y-oxunda da böyütmə (scale) dəyəri 1.5 əlavə edildi
  const animationVariants = {
    initial: { scaleX: 1.5, scaleY: 1.5, y: "-100%" },
    animate: { scaleX: 1.5, scaleY: 1.5, y: "100%" },
    // Dəyişiklik: Çıxış (exit) animasiyasında da transformun mərkəz nöqtəsi nəzərə alınır
    exit: { scale: 0, y: "100%" }
  };

  return (
    <motion.div
      // Dəyişiklik: initial, animate, exit üçün variantlardan istifadə edirik
      variants={animationVariants} 
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 3, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        // Dəyişiklik: Hündürlüyü 100vw yerinə 100vh qoyuldu
        height: "100vh", 
        borderBottomLeftRadius: "50%",
        borderBottomRightRadius: "50%",
        background: isBlackBg ? "black" : "white",
        zIndex: 9999,
        pointerEvents: "none",
        // Transformun origin-i yuxarı-orta nöqtəyə qoyuldu
        transformOrigin: "top center",
      }}
    />
  );
};