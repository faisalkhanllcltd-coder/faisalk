"use client";

import { useEffect } from "react";

/**
 * ScrollRevealProvider checks if the browser supports native CSS
 * scroll-driven animations (`animation-timeline: view()`).
 *
 * If native CSS scroll animations are supported, this provider exits early
 * with 0 overhead (compositor thread handles everything).
 *
 * If unsupported, it engages an IntersectionObserver fallback that adds
 * `.is-revealed` to elements bearing `.scroll-reveal`.
 */
export function ScrollRevealProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if browser natively supports animation-timeline: view()
    const supportsNativeScrollTimeline =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      (CSS.supports("animation-timeline", "view()") ||
        CSS.supports("animation-timeline: view()"));

    if (supportsNativeScrollTimeline) {
      // Native CSS handles the animation on the compositor thread
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const elements = document.querySelectorAll(".scroll-reveal");

    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    // Observe DOM mutations to catch client-side navigated routes
    const mutationObserver = new MutationObserver(() => {
      const newElements = document.querySelectorAll(".scroll-reveal:not(.is-revealed)");
      newElements.forEach((el) => observer.observe(el));
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
