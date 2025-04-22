"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
    );

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    // Initial check
    handleChange();

    // Listen for media query changes
    mediaQuery.addEventListener("change", handleChange);

    // Fallback resize listener (optional but safe)
    const resizeFallback = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", resizeFallback);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      window.removeEventListener("resize", resizeFallback);
    };
  }, []);

  return isMobile;
}
