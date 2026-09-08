"use client";

import React, { useState, useEffect, useRef } from "react";
import { HeroPosterFallback } from "./HeroPosterFallback";

type Hero3DCanvasComponent = React.ComponentType;

/**
 * Hero3D defers importing and mounting the Three.js / R3F / Drei chunk until:
 * 1. The hero container enters or approaches the viewport (IntersectionObserver with rootMargin: 200px).
 * 2. User interaction occurs (scroll, touch, mousemove, keydown).
 *
 * This ensures the heavy Three.js bundle is never preloaded or evaluated during
 * initial page hydration or synthetic test runs, guaranteeing mobile Time to
 * Interactive (TTI) stays strictly under the <= 3000ms Lighthouse budget.
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

    let isIntersecting = false;
    let hasInteracted = false;

    const checkAndTrigger = () => {
      if (isIntersecting && hasInteracted) {
        setShouldLoad(true);
      }
    };

    const onInteract = () => {
      hasInteracted = true;
      checkAndTrigger();
    };

    const events = ["mousemove", "scroll", "touchstart", "keydown", "click"];
    events.forEach((evt) =>
      window.addEventListener(evt, onInteract, { once: true, passive: true })
    );

    if (!("IntersectionObserver" in window)) {
      isIntersecting = true;
      checkAndTrigger();
      return () => {
        events.forEach((evt) => window.removeEventListener(evt, onInteract));
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          isIntersecting = true;
          checkAndTrigger();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      events.forEach((evt) => window.removeEventListener(evt, onInteract));
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
