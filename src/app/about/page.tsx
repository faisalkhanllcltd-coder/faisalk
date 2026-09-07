import Link from "next/link";
import { constructMetadata, getAboutPageSchema } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";

export const metadata = constructMetadata({
  title: "About",
  description:
    "Faisal Khan is a senior web developer and digital marketing engineer specializing in high-performance Next.js web applications, technical SEO, and conversion rate optimization.",
  path: "/about",
});

export default function AboutPage() {
  const jsonLd = getAboutPageSchema();

  const skills = [
    {
      category: "Frontend Architecture",
      items: ["Next.js (App Router)", "React 19", "TypeScript (Strict)", "Tailwind CSS v4", "HTML5 & Semantic DOM"],
    },
    {
      category: "Performance & Quality",
      items: ["Core Web Vitals (LCP, INP, CLS)", "Lighthouse 100/100 Audits", "WCAG 2.2 AA Accessibility", "Bundle Size Budgets", "Cross-Browser Testing"],
    },
    {
      category: "Growth & Conversion",
      items: ["Technical & Programmatic SEO", "Schema.org Structured Data", "Conversion Rate Optimization (CRO)", "Google Tag Manager & GA4", "Lead Funnel Engineering"],
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <JsonLd data={jsonLd} />

      <section aria-labelledby="about-heading" className="space-y-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Professional Background
        </div>
        <h1
          id="about-heading"
          className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl"
        >
          Engineering technical excellence that fuels business growth.
        </h1>

        <div className="prose prose-gray max-w-none text-base leading-relaxed text-gray-700 space-y-4">
          <p>
            I am a web developer and digital marketing engineer who believes that website speed, accessibility, and conversion architecture are inseparable. A website that renders in 800 milliseconds and ranks #1 on Google is meaningless if the checkout funnel is confusing. Conversely, the most persuasive marketing copy in the world will fail if mobile users bounce after three seconds of loading latency.
          </p>
          <p>
            Over the past several years, I have helped venture-backed SaaS startups, high-growth e-commerce brands, and healthcare organizations redesign their web platforms from the ground up. My focus is always on quantifiable outcomes: conversion rate lifts, reduced acquisition costs, sub-second Core Web Vitals, and strict accessibility compliance.
          </p>
        </div>
      </section>

      {/* Skills Matrix */}
      <section aria-labelledby="skills-heading" className="mt-16 border-t border-gray-200 pt-12">
        <h2 id="skills-heading" className="text-2xl font-bold tracking-tight text-gray-950">
          Technical &amp; Strategic Proficiencies
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          A balanced skill set delivering end-to-end web experiences from foundational code to audience acquisition.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-950">
                {skillGroup.category}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {skillGroup.items.map((item) => (
                  <li key={item} className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Work Principles */}
      <section aria-labelledby="principles-heading" className="mt-16 border-t border-gray-200 pt-12">
        <h2 id="principles-heading" className="text-2xl font-bold tracking-tight text-gray-950">
          Guiding Principles
        </h2>

        <div className="mt-6 space-y-6">
          <div className="rounded-lg border-l-4 border-blue-600 bg-white p-5 shadow-xs">
            <h3 className="font-bold text-gray-950">1. Server-Rendered by Default</h3>
            <p className="mt-1 text-sm text-gray-600">
              Websites should deliver real HTML on first paint. Search engines should never struggle to index core content, and users on low-bandwidth networks should never wait on megabytes of JavaScript before reading.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-blue-600 bg-white p-5 shadow-xs">
            <h3 className="font-bold text-gray-950">2. Performance is a Feature</h3>
            <p className="mt-1 text-sm text-gray-600">
              Every 100ms of latency cost is directly tied to a reduction in conversions. Budgets for initial JavaScript payloads, image optimization, and server response times are treated as strict constraints, not suggestions.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-blue-600 bg-white p-5 shadow-xs">
            <h3 className="font-bold text-gray-950">3. Non-Negotiable Accessibility</h3>
            <p className="mt-1 text-sm text-gray-600">
              All digital products must meet WCAG 2.2 AA standards as a baseline. Keyboard accessibility, proper color contrast, ARIA landmarks, and reduced-motion fallbacks ensure every prospective customer can navigate without hindrance.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section aria-label="Contact CTA" className="mt-16 rounded-2xl bg-gray-50 border border-gray-200 p-8 text-center sm:p-10">
        <h2 className="text-xl font-bold text-gray-950 sm:text-2xl">
          Interested in working together?
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-gray-600">
          I am always happy to discuss challenging frontend engineering roles, e-commerce re-architectures, or technical marketing advisory.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-lg bg-gray-950 px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-blue-600"
          >
            Get in touch
          </Link>
          <Link
            href="/work"
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-xs transition hover:bg-gray-50"
          >
            Browse Case Studies
          </Link>
        </div>
      </section>
    </div>
  );
}
