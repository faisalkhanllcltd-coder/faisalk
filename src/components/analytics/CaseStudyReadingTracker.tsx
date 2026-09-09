"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

interface CaseStudyReadingTrackerProps {
  slug: string;
}

/**
 * Tracks reader engagement depth (25%, 50%, 75%, 100%) on case studies
 * with zero DOM footprint and throttled requestAnimationFrame execution.
 */
export function CaseStudyReadingTracker({ slug }: CaseStudyReadingTrackerProps) {
  const trackedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const article = document.querySelector("article");
        if (!article) {
          ticking = false;
          return;
        }

        const rect = article.getBoundingClientRect();
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;

        // Calculate progress through the article
        const scrolledPastTop = Math.max(0, -rect.top + windowHeight);
        const progressRatio = Math.min(1, scrolledPastTop / articleHeight);
        const percent = Math.floor(progressRatio * 100);

        const thresholds = [25, 50, 75, 100] as const;

        for (const threshold of thresholds) {
          if (percent >= threshold && !trackedDepths.current.has(threshold)) {
            trackedDepths.current.add(threshold);
            trackEvent({
              name: "case_study_scroll_depth",
              properties: {
                slug,
                depth: threshold,
              },
            });
          }
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [slug]);

  return null;
}
