import React from "react";

interface HeroPosterFallbackProps {
  locale?: string;
}

export function HeroPosterFallback({ locale = "en" }: HeroPosterFallbackProps) {
  const isArabic = locale === "ar";

  return (
    <div
      role="region"
      aria-label={isArabic ? "شعار فيصل خان الهندسي" : "Faisal Khan Editorial Typography"}
      className="relative w-full h-[320px] sm:h-[380px] lg:h-[440px] rounded-2xl overflow-hidden bg-emerald-950/[0.04] border border-emerald-900/15 shadow-xl dark:bg-slate-950 dark:border-slate-800 dark:shadow-2xl flex flex-col items-center justify-center p-6 sm:p-8 select-none text-center transition-colors duration-200"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Ambient Radial Depth Glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(5,150,105,0.08),transparent_75%)] dark:bg-[radial-gradient(circle_at_50%_40%,rgba(52,211,153,0.12),transparent_75%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Rim Light Reflection Gradient */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full"
        aria-hidden="true"
      />

      {/* Editorial Kinetic Typography Presentation */}
      <div className="relative z-10 max-w-xs sm:max-w-sm mx-auto space-y-4">
        {/* Beat 1: Primary Line */}
        <p
          className={`text-xl sm:text-2xl font-semibold tracking-tight text-[#065f46] dark:text-[#34d399] drop-shadow-[0_1px_8px_rgba(52,211,153,0.2)] leading-[1.3] ${
            isArabic ? "font-arabic" : "font-serif italic"
          }`}
        >
          {isArabic
            ? "«من أصول العلوم العربية إلى هندسة البرمجيات.»"
            : "From Arabic scholarship to shipped software."}
        </p>

        {/* Subtle Decorative Divider */}
        <div className="flex items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-500/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600/60 dark:bg-emerald-400/60" />
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-500/40" />
        </div>

        {/* Beat 2: Secondary Line */}
        <p
          className={`text-xs sm:text-sm font-medium tracking-wide text-[#0f172a] dark:text-[#e2e8f0] drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] ${
            isArabic ? "font-arabic" : "tracking-wider uppercase font-semibold"
          }`}
        >
          {isArabic ? "«لغتان. وحرفة واحدة.»" : "Two languages. One craft."}
        </p>
      </div>

      {/* Status indicator badge */}
      <div className="pointer-events-none absolute bottom-3 end-3 rounded-full bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 text-[10px] font-medium text-emerald-800 dark:text-emerald-400/80 backdrop-blur-xs border border-emerald-600/20 dark:border-emerald-500/20 shadow-xs">
        Kinetic Typography Engine
      </div>
    </div>
  );
}
