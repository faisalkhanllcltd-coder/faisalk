"use client";

import dynamic from "next/dynamic";
import { HeroPosterFallback } from "./HeroPosterFallback";

// Lazy-mount code-split 3D bundle to guarantee initial route JS remains strictly under budget (<150KB)
const Hero3DCanvas = dynamic(() => import("./Hero3DCanvas"), {
  ssr: false,
  loading: () => <HeroPosterFallback />,
});

export function Hero3D() {
  return <Hero3DCanvas />;
}
