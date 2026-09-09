"use client";

export type AnalyticsEvent =
  | {
      name: "resume_download";
      properties?: {
        url?: string;
        source?: string;
      };
    }
  | {
      name: "case_study_scroll_depth";
      properties: {
        slug: string;
        depth: 25 | 50 | 75 | 100;
      };
    }
  | {
      name: "contact_form_submit";
      properties: {
        projectType: string;
      };
    };

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    va?: (action: string, data: Record<string, unknown>) => void;
    plausible?: (eventName: string, options?: { props: Record<string, unknown> }) => void;
  }
}

/**
 * Track custom user conversion milestones with 0 bundle overhead.
 * Forwards to standard global analytics hooks if present.
 */
export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  // 1. Dispatch custom DOM event for local subscribers/tests
  const customEvent = new CustomEvent("portfolio:track", {
    detail: event,
    bubbles: true,
  });
  window.dispatchEvent(customEvent);

  // 2. Google Analytics / Tag Manager compatibility
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: event.name,
      ...event.properties,
    });
  }

  // 3. Vercel Analytics compatibility
  if (typeof window.va === "function") {
    window.va("event", { name: event.name, ...event.properties });
  }

  // 4. Plausible Analytics compatibility
  if (typeof window.plausible === "function") {
    window.plausible(event.name, { props: event.properties || {} });
  }
}
