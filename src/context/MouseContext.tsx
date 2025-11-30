import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface MouseContextProps {
  x: number;
  y: number;
}
// const bgColorsForPath = ["/contact"];

const MouseContext = createContext<MouseContextProps>({ x: 0, y: 0 });
// const path = useLocation();
// const isBlackBg = bgColorsForPath.includes(path?.pathname);
export const useMouse = () => useContext(MouseContext);

export const MouseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const [lastMove, setLastMove] = useState<number>(Date.now());
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setLastMove(Date.now());
      setVisible(true);

      setTrail((prev) => [
        ...prev.slice(-15), // maksimum 15 hisse
        { id: Date.now(), x: e.clientX, y: e.clientY },
      ]);
    };

    const interval = setInterval(() => {
      if (Date.now() - lastMove > 1000) {
        setVisible(false);
        setTrail([]);
      }
    }, 200);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [lastMove]);

  return (
    <MouseContext.Provider value={{ x: 0, y: 0 }}>
      {children}
      {visible && (
        <div className="smoke-trail">
          {trail.map((t) => (
            <span
              key={t.id}
              className="smoke"
              style={{
                left: t.x + "px",
                top: t.y + "px",
                // background: isBlackBg ? "white" : "black",
                
              }}
            />
          ))}
        </div>
      )}
    </MouseContext.Provider>
  );
};
