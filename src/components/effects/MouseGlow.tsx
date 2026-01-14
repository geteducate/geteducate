import { useEffect, useState } from "react";

const MouseGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hue, setHue] = useState(30); // Start with orange/gold

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Change hue based on mouse position for color variation
      const newHue = (e.clientX / window.innerWidth) * 60 + 20; // Range from 20-80 (gold to green)
      setHue(newHue);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 opacity-40 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
          hsla(${hue}, 80%, 50%, 0.15), 
          hsla(${hue + 30}, 70%, 40%, 0.08), 
          transparent 40%)`,
      }}
    />
  );
};

export default MouseGlow;