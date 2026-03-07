"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  /** Animation direction: 'up' | 'down' | 'left' | 'right' */
  direction?: "up" | "down" | "left" | "right";
  /** Delay in seconds */
  delay?: number;
  /** Duration in seconds */
  duration?: number;
  /** Distance in pixels */
  distance?: number;
  /** Extra className */
  className?: string;
  /** Run animation only once */
  once?: boolean;
}

const directionMap = {
  up: { y: 1, x: 0 },
  down: { y: -1, x: 0 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

/**
 * Reusable scroll-triggered reveal animation wrapper.
 * Fades in and slides from the given direction when scrolled into view.
 */
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 40,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const dir = directionMap[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: dir.x * distance,
      y: dir.y * distance,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Expo out
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
