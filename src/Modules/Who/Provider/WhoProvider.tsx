
import React, { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export const useWhoProvider = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const containerRef = React.useRef<HTMLElement>(null);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      x.set((clientX - centerX) / 5); 
      y.set((clientY - centerY) / 5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return {
    containerRef,
    springX,
    springY
  };
};
