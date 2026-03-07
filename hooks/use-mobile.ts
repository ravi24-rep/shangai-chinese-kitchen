"use client";

import { useState, useEffect } from "react";

/**
 * Returns true when viewport is below the given breakpoint.
 * SSR-safe: defaults to false on server.
 */
export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
