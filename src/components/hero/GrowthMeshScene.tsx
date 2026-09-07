"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GrowthMeshSceneProps {
  reducedMotion?: boolean;
}

// Generate ambient floating data points deterministically at module scope
// to guarantee idempotent rendering and zero per-render overhead
function generateParticleData() {
  const count = 180;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const colorA = new THREE.Color("#3b82f6"); // Blue 500
  const colorB = new THREE.Color("#60a5fa"); // Blue 400
  const colorC = new THREE.Color("#38bdf8"); // Sky 400

  // Deterministic Linear Congruential Generator (LCG)
  let seed = 42;
  function pseudoRandom() {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  }

  for (let i = 0; i < count; i++) {
    // Distribute in a spherical shell around the mesh
    const radius = 2.2 + pseudoRandom() * 1.6;
    const theta = pseudoRandom() * Math.PI * 2;
    const phi = Math.acos(2 * pseudoRandom() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const pickedColor = i % 3 === 0 ? colorA : i % 3 === 1 ? colorB : colorC;
    colors[i * 3] = pickedColor.r;
    colors[i * 3 + 1] = pickedColor.g;
    colors[i * 3 + 2] = pickedColor.b;
  }

  return { positions, colors };
}

const STATIC_PARTICLES = generateParticleData();

export function GrowthMeshScene({ reducedMotion = false }: GrowthMeshSceneProps) {
  const meshGroupRef = useRef<THREE.Group>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    // Smooth subtle continuous rotation
    if (meshGroupRef.current) {
      meshGroupRef.current.rotation.y += delta * 0.12;
      meshGroupRef.current.rotation.x += delta * 0.05;

      // Cursor parallax tracking
      const targetX = state.pointer.x * 0.35;
      const targetY = -state.pointer.y * 0.35;
      meshGroupRef.current.rotation.y = THREE.MathUtils.damp(meshGroupRef.current.rotation.y, targetX + meshGroupRef.current.rotation.y, 2, delta);
      meshGroupRef.current.rotation.x = THREE.MathUtils.damp(meshGroupRef.current.rotation.x, targetY + meshGroupRef.current.rotation.x, 2, delta);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.08;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.04;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[6, 8, 4]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-4, -4, -2]} intensity={2.0} color="#3b82f6" />
      <pointLight position={[3, 2, 4]} intensity={1.5} color="#60a5fa" />

      <group ref={meshGroupRef}>
        {/* Outer Wireframe Polyhedron */}
        <mesh>
          <icosahedronGeometry args={[1.75, 1]} />
          <meshStandardMaterial
            wireframe
            color="#60a5fa"
            emissive="#1d4ed8"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Inner Solid Translucent Core */}
        <mesh ref={coreMeshRef}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial
            color="#1e3a8a"
            emissive="#1e40af"
            emissiveIntensity={0.3}
            roughness={0.4}
            metalness={0.6}
            transparent
            opacity={0.45}
          />
        </mesh>

        {/* Orbital Coordinate Rings */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[2.3, 2.32, 64]} />
          <meshBasicMaterial color="#3b82f6" side={THREE.DoubleSide} transparent opacity={0.3} />
        </mesh>

        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <ringGeometry args={[2.55, 2.57, 64]} />
          <meshBasicMaterial color="#60a5fa" side={THREE.DoubleSide} transparent opacity={0.2} />
        </mesh>

        {/* Ambient Data Points / Particles */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[STATIC_PARTICLES.positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[STATIC_PARTICLES.colors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.035}
            vertexColors
            transparent
            opacity={0.85}
            sizeAttenuation
          />
        </points>
      </group>
    </>
  );
}
