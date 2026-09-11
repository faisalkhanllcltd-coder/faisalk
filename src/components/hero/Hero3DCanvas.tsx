"use client";

import React, { Component, ReactNode, useSyncExternalStore, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { GrowthMeshScene } from "./GrowthMeshScene";
import { HeroPosterFallback } from "./HeroPosterFallback";

// Error boundary to gracefully catch any WebGL crash or context loss
interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("WebGL rendering encountered an error, falling back to static poster:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// Stable subscriptions for external browser capabilities via useSyncExternalStore
const emptySubscribe = () => () => {};

function subscribeMotionQuery(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getClientSnapshot(): boolean {
  return true;
}

function getServerSnapshot(): boolean {
  return false;
}

function getMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getMotionServerSnapshot(): boolean {
  return false;
}

let cachedWebGL: boolean | null = null;
function getWebGLSnapshot(): boolean {
  if (cachedWebGL === null) {
    cachedWebGL = checkWebGLSupport();
  }
  return cachedWebGL;
}

function getWebGLServerSnapshot(): boolean {
  return false;
}

// Hook to detect first user interaction
function useInteraction(): boolean {
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    if (interacted) return;

    const onInteract = () => setInteracted(true);
    const events = ["mousemove", "scroll", "touchstart", "keydown"];

    events.forEach((evt) => window.addEventListener(evt, onInteract, { once: true, passive: true }));

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, onInteract));
    };
  }, [interacted]);

  return interacted;
}

export default function Hero3DCanvas() {
  const isMounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
  const hasWebGL = useSyncExternalStore(emptySubscribe, getWebGLSnapshot, getWebGLServerSnapshot);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeMotionQuery,
    getMotionSnapshot,
    getMotionServerSnapshot
  );
  const hasInteracted = useInteraction();

  // During SSR or pre-hydration, or if WebGL is unavailable, reduced motion requested,
  // or user hasn't interacted yet: Render the static SVG/CSS poster fallback
  if (!isMounted || !hasWebGL || prefersReducedMotion || !hasInteracted) {
    return <HeroPosterFallback />;
  }

  return (
    <WebGLErrorBoundary fallback={<HeroPosterFallback />}>
      <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[440px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          aria-hidden="true"
        >
          <GrowthMeshScene reducedMotion={prefersReducedMotion} />
        </Canvas>

        {/* Ambient Overlay Vignette */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(2,6,23,0.6)_100%)]"
          aria-hidden="true"
        />

        {/* Status Indicator Badge */}
        <div className="pointer-events-none absolute bottom-3 end-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-medium text-slate-400 backdrop-blur-xs border border-slate-700/50">
          Interactive 3D Engine
        </div>
      </div>
    </WebGLErrorBoundary>
  );
}

