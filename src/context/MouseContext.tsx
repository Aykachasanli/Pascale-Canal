import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

interface MouseContextProps {
  x: number;
  y: number;
}

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  offsetX: number;
  offsetY: number;
}

const MouseContext = createContext<MouseContextProps>({ x: 0, y: 0 });


const darkBgPaths = ["/contact", "/who", "/commande-personnalisee"];

export const useMouse = () => useContext(MouseContext);

export const MouseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const lastTrailTime = useRef<number>(0);
  const location = useLocation();
  

  const isDarkBg = darkBgPaths.some(path => location.pathname.startsWith(path));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();


      if (now - lastTrailTime.current > 20) {
        lastTrailTime.current = now;
        

        const randomRotation = Math.random() * 180 - 90;
        const randomScale = 0.7 + Math.random() * 0.6;
        const randomOffsetX = (Math.random() - 0.5) * 12;
        const randomOffsetY = (Math.random() - 0.5) * 10;
        
        setTrail((prev) => [
          ...prev.slice(-30),
          { 
            id: now, 
            x: e.clientX, 
            y: e.clientY,
            rotation: randomRotation,
            scale: randomScale,
            offsetX: randomOffsetX,
            offsetY: randomOffsetY
          },
        ]);
      }
    };


    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTrail((prev) => prev.filter((t) => now - t.id < 2500));
    }, 80);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearInterval(cleanupInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <MouseContext.Provider value={{ x: 0, y: 0 }}>
      {children}
      <div className={`smoke-trail ${isDarkBg ? 'smoke-light' : 'smoke-dark'}`}>
        {trail.map((t, index) => (
          <span
            key={t.id}
            className="smoke"
            style={{
              left: t.x + t.offsetX + "px",
              top: t.y + t.offsetY + "px",
              transform: `translate(-50%, -50%) rotate(${t.rotation}deg) scale(${t.scale})`,
              animationDelay: `${index * 0.02}s`,
            }}
          />
        ))}
      </div>
    </MouseContext.Provider>
  );
};

