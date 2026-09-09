import Link from "next/link";
import { constructMetadata, getAboutPageSchema } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import { TrackedAnchor } from "@/components/analytics/TrackedLink";

export const metadata = constructMetadata({
  title: "About",
  description:
    "Faisal Khan is a web developer and digital marketer based in Karachi, Pakistan, specializing in high-performance web applications, learning platforms, and conversion architecture.",
  path: "/about",
});

export default function AboutPage() {
  const jsonLd = getAboutPageSchema();

  const skills = [
    {
      category: "Frontend & Web Engineering",
      items: [
        "Next.js (App Router) & React 19",
        "Astro 6 & Svelte 5 (Runes)",
        "TypeScript (Strict) & HTML5",
        "Tailwind CSS v4 & shadcn/ui",
        "TanStack Start, Router & Query",
      ],
    },
    {
      category: "Backend & Real-Time Systems",
      items: [
        "Supabase (Postgres, RLS, Auth)",
        "LiveKit Cloud (WebRTC Video/Audio)",
        "Cloudflare Pages & Workers",
        "Resend Transactional Email",
        "Zod Schema Validation",
      ],
    },
    {
      category: "Growth & Digital Marketing",
      items: [
        "Funnel Architecture & CRO",
        "Tiered Pricing & Catalog Redesign",
        "Technical SEO & Schema.org",
        "Conversion Flow Engineering",
        "Performance & Core Web Vitals",
      ],
    },
  ];

  const education = [
    {
      institution: "Jamia Darul Uloom Karachi",
      degree: "M.A. Arabic & Islamic Studies",
      date: "Completed August 10, 2020",
    },
    {
      institution: "Mahad Uthman Bin Affan",
      degree: "1-Year Diploma, CIT/DIT & Web Development + English + Arabic Language",
      date: "Started October 20, 2020",
    },
  ];

  const employment = [
    {
      role: "Self-Employed Web Developer & Marketer",
      organization: "Online Quran Academy (Quranific.com & Quran Gateway LMS)",
      period: "2022 — Present",
      description:
        "Architecting full-stack web platforms, course catalogs, live virtual classrooms, tiered billing systems, and conversion-focused acquisition funnels.",
    },
    {
      role: "Book Proofreader & Support Staff",
      organization: "Maktaba Al-Bushra",
      period: "Dec 20, 2021 — Jan 23, 2024",
      description:
        "Editorial review, academic text proofreading, and operational publishing support.",
    },
    {
      role: "Web Developer & Marketing",
      organization: "Haramen Travel Agency",
      period: "Nov 12, 2020 — Oct 25, 2021",
      description:
        "Website development, online portal maintenance, and travel marketing campaign coordination.",
    },
  ];

  const languages = [
    { name: "English", level: "Professional working proficiency" },
    { name: "Arabic", level: "Advanced / Academic proficiency" },
    { name: "Urdu", level: "Native / Bilingual" },
    { name: "Pashto", level: "Native / Bilingual" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <JsonLd data={jsonLd} />

      {/* Header Bio */}
      <section aria-labelledby="about-heading" className="space-y-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Professional Profile
        </div>
        <h1
          id="about-heading"
          className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl"
        >
          Web engineering and digital marketing grounded in real deliverables.
        </h1>

        <div className="prose prose-gray max-w-none text-base leading-relaxed text-gray-700 space-y-4">
          <p>
            I am Faisal Khan, a web developer and digital marketer based in Karachi, Pakistan. Since 2020, I have operated at the intersection of modern frontend engineering and conversion marketing — building production web applications, educational platforms, and digital funnels that deliver tangible business value.
          </p>
          <p>
            Currently, I build and operate web applications for an online Quran academy, including the live production platform <strong>Quranific.com</strong> and the enterprise multi-audience platform <strong>Quran Gateway LMS</strong>. Alongside web development, I remain active professionally in Arabic language work and editorial book proofreading.
          </p>
        </div>

        <div>
          <TrackedAnchor
            href="/resume.pdf"
            download="Faisal-Khan-Resume.pdf"
            event={{
              name: "resume_download",
              properties: { url: "/resume.pdf", source: "about_page" },
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-800 shadow-2xs transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <svg
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            <span>Download Resume (PDF)</span>
          </TrackedAnchor>
        </div>
      </section>

      {/* Employment History */}
      <section aria-labelledby="experience-heading" className="scroll-reveal mt-16 border-t border-gray-200 pt-12">
        <h2 id="experience-heading" className="text-2xl font-bold tracking-tight text-gray-950">
          Employment History
        </h2>
        <div className="mt-6 space-y-6">
          {employment.map((job) => (
            <div
              key={job.role}
              className="scroll-reveal rounded-xl border border-gray-200 bg-white p-6 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-950">{job.role}</h3>
                  <div className="text-sm font-medium text-blue-600">{job.organization}</div>
                </div>
                <div className="mt-1 text-xs font-semibold text-gray-600 sm:mt-0">
                  {job.period}
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section aria-labelledby="education-heading" className="scroll-reveal mt-16 border-t border-gray-200 pt-12">
        <h2 id="education-heading" className="text-2xl font-bold tracking-tight text-gray-950">
          Education &amp; Credentials
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="scroll-reveal rounded-xl border border-gray-200 bg-gray-50 p-6"
            >
              <div className="text-xs font-semibold text-blue-600">{edu.date}</div>
              <h3 className="mt-2 text-base font-bold text-gray-950">{edu.degree}</h3>
              <p className="mt-1 text-sm text-gray-600">{edu.institution}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section aria-labelledby="languages-heading" className="scroll-reveal mt-16 border-t border-gray-200 pt-12">
        <h2 id="languages-heading" className="text-2xl font-bold tracking-tight text-gray-950">
          Languages
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="scroll-reveal rounded-lg border border-gray-200 bg-white p-4 text-center shadow-2xs"
            >
              <div className="text-base font-bold text-gray-950">{lang.name}</div>
              <div className="mt-1 text-xs text-gray-600">{lang.level}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Matrix */}
      <section aria-labelledby="skills-heading" className="scroll-reveal mt-16 border-t border-gray-200 pt-12">
        <h2 id="skills-heading" className="text-2xl font-bold tracking-tight text-gray-950">
          Technical &amp; Strategic Proficiencies
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Practical competencies applied daily in production environments.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {skills.map((skillGroup, idx) => (
            <div
              key={skillGroup.category}
              className={`scroll-reveal ${idx === 1 ? "scroll-reveal-delay-1" : idx === 2 ? "scroll-reveal-delay-2" : ""} rounded-xl border border-gray-200 bg-gray-50 p-6`}
            >
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
      <section aria-labelledby="principles-heading" className="scroll-reveal mt-16 border-t border-gray-200 pt-12">
        <h2 id="principles-heading" className="text-2xl font-bold tracking-tight text-gray-950">
          Guiding Principles
        </h2>

        <div className="mt-6 space-y-6">
          <div className="scroll-reveal rounded-lg border-l-4 border-blue-600 bg-white p-5 shadow-xs">
            <h3 className="font-bold text-gray-950">1. Server-Rendered by Default</h3>
            <p className="mt-1 text-sm text-gray-600">
              Websites should deliver real HTML on first paint. Core content must be immediately readable by users on low-bandwidth networks and effortlessly crawlable by search engines.
            </p>
          </div>

          <div className="scroll-reveal rounded-lg border-l-4 border-blue-600 bg-white p-5 shadow-xs">
            <h3 className="font-bold text-gray-950">2. Real Deliverables Over Vanities</h3>
            <p className="mt-1 text-sm text-gray-600">
              Technology choices serve business objectives. Every feature, component, and line of code must trace back to clear user value, operational stability, or verified business growth.
            </p>
          </div>

          <div className="scroll-reveal rounded-lg border-l-4 border-blue-600 bg-white p-5 shadow-xs">
            <h3 className="font-bold text-gray-950">3. Non-Negotiable Accessibility</h3>
            <p className="mt-1 text-sm text-gray-600">
              Digital products must meet WCAG 2.2 AA standards as a baseline. Keyboard accessibility, clear semantic landmarks, and motion preference checks ensure universal usability.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section aria-label="Contact CTA" className="scroll-reveal mt-16 rounded-2xl bg-gray-50 border border-gray-200 p-8 text-center sm:p-10">
        <h2 className="text-xl font-bold text-gray-950 sm:text-2xl">
          Interested in discussing a project or role?
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-gray-600">
          Whether you need full-stack web engineering, custom LMS architecture, or conversion-focused marketing strategy, let&apos;s talk.
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
