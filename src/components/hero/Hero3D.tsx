"use client";

import React, { useState, useEffect, useRef } from "react";
import { HeroPosterFallback } from "./HeroPosterFallback";

type Hero3DCanvasComponent = React.ComponentType;

/**
 * Hero3D truly defers loading the Three.js / R3F / Drei chunk until the hero
 * enters the viewport (rootMargin ~200px).
 *
 * This avoids next/dynamic's automatic chunk preloading during initial hydration,
 * ensuring the initial route payload and mobile Time to Interactive (TTI) stay
 * strictly within the <=3000ms Lighthouse budget.
 */
export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [CanvasComponent, setCanvasComponent] = useState<Hero3DCanvasComponent | null>(null);

  useEffect(() => {
    if (shouldLoad) return;
    if (typeof window === "undefined") return;

    // If user prefers reduced motion, skip downloading the 3D bundle entirely
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      const fallbackTimer = setTimeout(() => setShouldLoad(true), 0);
      return () => clearTimeout(fallbackTimer);
    }

    const triggerLoad = () => {
      if ("requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(
          () => setShouldLoad(true)
        );
      } else {
        setTimeout(() => setShouldLoad(true), 150);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          triggerLoad();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;

    let isMounted = true;
    import("./Hero3DCanvas")
      .then((mod) => {
        if (isMounted) {
          setCanvasComponent(() => mod.default);
        }
      })
      .catch((err) => {
        console.warn("Failed to dynamically import Hero3DCanvas:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="w-full">
      {CanvasComponent ? <CanvasComponent /> : <HeroPosterFallback />}
    </div>
  );
}
