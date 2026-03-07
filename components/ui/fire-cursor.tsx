"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const COLORS = [
  "#FF3300", // Bright Red/Orange
  "#FF6600", // Orange
  "#FF9900", // Light Orange
  "#FFCC00", // Yellow
];

export default function FireCursor() {
  const isMobile = useMobile();
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    // Disable on mobile for performance and touch UX
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Calculate distance from last position to avoid spawning too many particles when moving slowly
      const dx = clientX - lastPos.current.x;
      const dy = clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 5) { // Only spawn if moved enough
        const newParticle: Particle = {
          id: particleId.current++,
          x: clientX,
          y: clientY,
          size: Math.random() * 8 + 4, // 4px to 12px
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };

        setParticles((prev) => [...prev.slice(-15), newParticle]); // keep max 15 particles
        lastPos.current = { x: clientX, y: clientY };
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    // Cleanup interval to remove old particles if mouse stops
    const cleanup = setInterval(() => {
      setParticles((prev) => {
        if (prev.length > 0) return prev.slice(1);
        return prev;
      });
    }, 50);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(cleanup);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, scale: 1, x: p.x, y: p.y }}
            animate={{ 
              opacity: 0, 
              scale: 0, 
              y: p.y - 40 - Math.random() * 20, // float upwards like fire
              x: p.x + (Math.random() - 0.5) * 20 // spread horizontally slightly
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.6 + Math.random() * 0.4, ease: "easeOut" }}
            className="absolute rounded-full mix-blend-screen"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              filter: "blur(2px)",
              left: -p.size / 2,
              top: -p.size / 2,
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Optional: Add a subtle main cursor dot that follows exactly */}
      <motion.div
        className="absolute w-2 h-2 bg-white rounded-full mix-blend-difference hidden md:block"
        style={{
          left: -4,
          top: -4,
        }}
        animate={{
          x: lastPos.current.x,
          y: lastPos.current.y,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
    </div>
  );
}
