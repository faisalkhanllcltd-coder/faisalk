"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { shapeArabic } from "@/lib/arabic-shaping";

interface KineticTypographySceneProps {
  reducedMotion?: boolean;
  locale?: string;
}

// Fallback ease-out cubic helper
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function KineticTypographyScene({
  reducedMotion = false,
  locale = "en",
}: KineticTypographySceneProps) {
  const isArabic = locale === "ar";
  const sceneGroupRef = useRef<THREE.Group>(null);
  const beat1GroupRef = useRef<THREE.Group>(null);
  const beat2GroupRef = useRef<THREE.Group>(null);
  const beat1MatRef = useRef<THREE.MeshStandardMaterial>(null);
  const beat2MatRef = useRef<THREE.MeshStandardMaterial>(null);
  const elapsedRef = useRef(0);

  // Dynamic theme detection for adaptive WCAG AAA color contrast
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Palette: Scholarly Emerald (WCAG AAA verified)
  // Dark: Primary #34d399 (10.5:1), Secondary #e2e8f0 (16.1:1)
  // Light: Primary #065f46 (7.7:1), Secondary #1e293b (15.5:1)
  const colors = useMemo(() => {
    if (isDark) {
      return {
        primary: "#34d399",
        secondary: "#e2e8f0",
        rimLight: "#34d399",
        fillLight: "#6ee7b7",
      };
    }
    return {
      primary: "#065f46",
      secondary: "#0f172a",
      rimLight: "#059669",
      fillLight: "#10b981",
    };
  }, [isDark]);

  // Copy definitions
  const beat1Text = useMemo(() => {
    if (isArabic) {
      // Flagged in plan: initial draft pending native review by Faisal Khan
      return shapeArabic("«من أصول العلوم العربية\nإلى هندسة البرمجيات.»");
    }
    return "From Arabic scholarship\nto shipped software.";
  }, [isArabic]);

  const beat2Text = useMemo(() => {
    if (isArabic) {
      return shapeArabic("«لغتان. وحرفة واحدة.»");
    }
    return "Two languages. One craft.";
  }, [isArabic]);

  const fontUrl = isArabic
    ? "/fonts/ibm-plex-sans-arabic-semibold.woff"
    : "/fonts/fraunces-semibold.woff";

  // Staggered vertical entrance and pointer parallax in idle
  useFrame((state, delta) => {
    elapsedRef.current += delta;
    const elapsed = elapsedRef.current;
    const mat1 = beat1MatRef.current;
    const mat2 = beat2MatRef.current;

    // 1. Initial Reveal Choreography (0.7s primary, 0.25s stagger secondary)
    if (!reducedMotion) {
      // Beat 1: Enters from t = 0 to 0.70s
      const p1 = Math.min(1, elapsed / 0.7);
      const e1 = easeOutCubic(p1);
      if (mat1) mat1.opacity = e1;
      if (beat1GroupRef.current) {
        beat1GroupRef.current.position.y = 0.32 + (1 - e1) * -0.3;
      }

      // Beat 2: Enters after 0.25s stagger delay
      if (elapsed > 0.25) {
        const p2 = Math.min(1, (elapsed - 0.25) / 0.6);
        const e2 = easeOutCubic(p2);
        if (mat2) mat2.opacity = e2;
        if (beat2GroupRef.current) {
          beat2GroupRef.current.position.y = -0.42 + (1 - e2) * -0.22;
        }
      } else {
        if (mat2) mat2.opacity = 0;
        if (beat2GroupRef.current) {
          beat2GroupRef.current.position.y = -0.64;
        }
      }
    } else {
      if (mat1) mat1.opacity = 1;
      if (mat2) mat2.opacity = 1;
      if (beat1GroupRef.current) beat1GroupRef.current.position.y = 0.32;
      if (beat2GroupRef.current) beat2GroupRef.current.position.y = -0.42;
    }

    // 2. Idle State: Restrained Pointer Parallax (Zero spinning, zero oscillating loops)
    if (sceneGroupRef.current && !reducedMotion) {
      const targetRotX = -state.pointer.y * 0.08;
      const targetRotY = state.pointer.x * 0.08;

      sceneGroupRef.current.rotation.x = THREE.MathUtils.damp(
        sceneGroupRef.current.rotation.x,
        targetRotX,
        3.5,
        delta
      );
      sceneGroupRef.current.rotation.y = THREE.MathUtils.damp(
        sceneGroupRef.current.rotation.y,
        targetRotY,
        3.5,
        delta
      );
    }
  });

  return (
    <>
      {/* Editorial Depth Lighting Rig */}
      <ambientLight intensity={isDark ? 0.7 : 1.1} />
      <directionalLight position={[4, 5, 5]} intensity={isDark ? 1.8 : 1.5} color="#ffffff" />
      <directionalLight position={[-4, -3, 3]} intensity={0.6} color={colors.fillLight} />
      <pointLight position={[0, -2, -3]} intensity={2.0} color={colors.rimLight} />

      <group ref={sceneGroupRef}>
        {/* Beat 1: Primary Display Line */}
        <group ref={beat1GroupRef} position={[0, 0.32, 0]}>
          <Text
            font={fontUrl}
            fontSize={isArabic ? 0.22 : 0.24}
            maxWidth={isArabic ? 2.8 : 3.0}
            lineHeight={isArabic ? 1.4 : 1.25}
            letterSpacing={isArabic ? 0 : -0.015}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            color={colors.primary}
            direction={isArabic ? "rtl" : "ltr"}
          >
            {beat1Text}
            <meshStandardMaterial
              ref={beat1MatRef}
              attach="material"
              roughness={0.28}
              metalness={0.35}
              transparent
              opacity={reducedMotion ? 1 : 0}
            />
          </Text>
        </group>

        {/* Beat 2: Secondary Editorial Line */}
        <group ref={beat2GroupRef} position={[0, -0.42, 0]}>
          <Text
            font={fontUrl}
            fontSize={isArabic ? 0.17 : 0.16}
            maxWidth={2.8}
            lineHeight={1.3}
            letterSpacing={isArabic ? 0 : 0.02}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            color={colors.secondary}
            direction={isArabic ? "rtl" : "ltr"}
          >
            {beat2Text}
            <meshStandardMaterial
              ref={beat2MatRef}
              attach="material"
              roughness={0.32}
              metalness={0.25}
              transparent
              opacity={reducedMotion ? 1 : 0}
            />
          </Text>
        </group>
      </group>
    </>
  );
}
