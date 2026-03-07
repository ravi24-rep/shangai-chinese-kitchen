"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, MotionValue } from "framer-motion";

interface MouseParallax {
  /** Normalized X motion value: -1 (left) to +1 (right) */
  x: MotionValue<number>;
  /** Normalized Y motion value: -1 (top) to +1 (bottom) */
  y: MotionValue<number>;
}

/**
 * Tracks mouse position relative to the viewport center.
 * Returns spring-smoothed motion values in the range [-1, 1].
 * Disabled when `enabled` is false (e.g. on mobile).
 */
export function useMouseParallax(enabled = true): MouseParallax {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 50, damping: 20, restDelta: 0.001 });
  const y = useSpring(rawY, { stiffness: 50, damping: 20, restDelta: 0.001 });

  useEffect(() => {
    if (!enabled) return;

    const handle = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;   // -1 … +1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;  // -1 … +1
      rawX.set(nx);
      rawY.set(ny);
    };

    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [enabled, rawX, rawY]);

  return { x, y };
}
