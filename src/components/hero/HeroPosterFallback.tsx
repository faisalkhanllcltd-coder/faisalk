import React from "react";

export function HeroPosterFallback() {
  return (
    <div
      role="img"
      aria-label="Interactive 3D Growth Systems visualization (static representation)"
      className="relative w-full h-[320px] sm:h-[380px] lg:h-[440px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center select-none"
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Static Geometric Mesh SVG */}
      <svg
        className="w-4/5 h-4/5 max-w-[320px] max-h-[320px] text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="polyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Orbit Rings */}
        <circle cx="100" cy="100" r="85" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="70" stroke="#334155" strokeWidth="0.8" opacity="0.6" />

        {/* Polyhedral Facets */}
        <polygon points="100,30 160,65 140,135" fill="url(#polyGrad)" stroke="url(#lineGrad)" strokeWidth="1.2" />
        <polygon points="100,30 140,135 60,135" fill="url(#polyGrad)" stroke="url(#lineGrad)" strokeWidth="1.2" />
        <polygon points="100,30 60,135 40,65" fill="url(#polyGrad)" stroke="url(#lineGrad)" strokeWidth="1.2" />
        <polygon points="160,65 140,135 100,170" fill="url(#polyGrad)" stroke="url(#lineGrad)" strokeWidth="1.2" />
        <polygon points="40,65 60,135 100,170" fill="url(#polyGrad)" stroke="url(#lineGrad)" strokeWidth="1.2" />
        <polygon points="140,135 60,135 100,170" fill="url(#polyGrad)" stroke="url(#lineGrad)" strokeWidth="1.2" />

        {/* Central Core Lattice Lines */}
        <line x1="100" y1="30" x2="100" y2="100" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="160" y1="65" x2="100" y2="100" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="40" y1="65" x2="100" y2="100" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="140" y1="135" x2="100" y2="100" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="60" y1="135" x2="100" y2="100" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="100" y1="170" x2="100" y2="100" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 2" />

        {/* Nodes / Vertices */}
        <circle cx="100" cy="30" r="4" fill="#60a5fa" filter="url(#glow)" />
        <circle cx="160" cy="65" r="3.5" fill="#3b82f6" />
        <circle cx="40" cy="65" r="3.5" fill="#3b82f6" />
        <circle cx="140" cy="135" r="3.5" fill="#2563eb" />
        <circle cx="60" cy="135" r="3.5" fill="#2563eb" />
        <circle cx="100" cy="170" r="4" fill="#60a5fa" filter="url(#glow)" />
        <circle cx="100" cy="100" r="4.5" fill="#93c5fd" filter="url(#glow)" />

        {/* Ambient Data Points */}
        <circle cx="25" cy="110" r="1.5" fill="#38bdf8" opacity="0.7" />
        <circle cx="175" cy="90" r="1.5" fill="#38bdf8" opacity="0.7" />
        <circle cx="120" cy="20" r="1" fill="#60a5fa" opacity="0.6" />
        <circle cx="80" cy="185" r="1.2" fill="#60a5fa" opacity="0.6" />
      </svg>

      {/* Status indicator */}
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-medium text-slate-400 backdrop-blur-xs border border-slate-700/50">
        Growth Systems Architecture
      </div>
    </div>
  );
}
