"use client";

import React, { useState, useEffect, useSyncExternalStore, ReactNode } from "react";
import dynamic from "next/dynamic";
import type { DotLottie } from "@lottiefiles/dotlottie-react";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  {
    ssr: false,
    loading: () => null,
  }
);

interface DotLottieIconProps {
  src: string;
  fallback: ReactNode;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  hover?: boolean;
}

const emptySubscribe = () => () => {};

function subscribeMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getMotionServerSnapshot(): boolean {
  return false;
}

function getClientSnapshot(): boolean {
  return true;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * DotLottieIcon renders dotLottie (.lottie) micro-animations with strict
 * accessibility and bundle budgets.
 *
 * - Uses useSyncExternalStore to subscribe to prefers-reduced-motion without
 *   cascading renders. If reduced motion is requested, renders the accessible
 *   static SVG fallback with 0 animation and 0 runtime loading.
 * - Code-splits the @lottiefiles/dotlottie-react runtime to keep initial
 *   route JS strictly under 150KB.
 */
export function DotLottieIcon({
  src,
  fallback,
  className = "w-4 h-4",
  loop = true,
  autoplay = true,
  speed = 1,
  hover = false,
}: DotLottieIconProps) {
  const isMounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    getMotionServerSnapshot
  );
  const [shouldLoad, setShouldLoad] = useState(false);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  useEffect(() => {
    if (shouldLoad || prefersReducedMotion) return;
    if (typeof window === "undefined") return;

    const trigger = () => setShouldLoad(true);

    const events = ["mousemove", "scroll", "touchstart", "keydown", "click"];
    events.forEach((evt) =>
      window.addEventListener(evt, trigger, { once: true, passive: true })
    );

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, trigger));
    };
  }, [shouldLoad, prefersReducedMotion]);

  // Before hydration, when user requests reduced motion, or before user interaction: render static fallback
  if (!isMounted || prefersReducedMotion || !shouldLoad) {
    return (
      <span
        className={`inline-flex items-center justify-center ${className}`}
        onMouseEnter={hover ? () => setShouldLoad(true) : undefined}
        onFocus={hover ? () => setShouldLoad(true) : undefined}
      >
        {fallback}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      aria-hidden="true"
      onMouseEnter={hover ? () => dotLottie?.play() : undefined}
      onMouseLeave={hover ? () => dotLottie?.stop() : undefined}
    >
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={hover ? false : autoplay}
        speed={speed}
        dotLottieRefCallback={setDotLottie}
        className="w-full h-full"
      />
    </span>
  );
}
