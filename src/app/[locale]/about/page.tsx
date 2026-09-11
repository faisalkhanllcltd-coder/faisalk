import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { constructMetadata, getAboutPageSchema } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import { TrackedAnchor } from "@/components/analytics/TrackedLink";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return constructMetadata({
    title: locale === "ar" ? "نبذة عني" : "About",
    description: t("bioP1"),
    path: "/about",
    locale,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "About" });
  const jsonLd = getAboutPageSchema();
  const isRtl = locale === "ar";

  const skills = [
    {
      category: isRtl ? "هندسة الواجهات وتطوير الويب" : "Frontend & Web Engineering",
      items: [
        "Next.js (App Router) & React 19",
        "Astro 6 & Svelte 5 (Runes)",
        "TypeScript (Strict) & HTML5",
        "Tailwind CSS v4 & shadcn/ui",
        "TanStack Start, Router & Query",
      ],
    },
    {
      category: isRtl ? "الأنظمة الخلفية والزمن اللحظي" : "Backend & Real-Time Systems",
      items: [
        "Supabase (Postgres, RLS, Auth)",
        "LiveKit Cloud (WebRTC Video/Audio)",
        "Cloudflare Pages & Workers",
        "Resend Transactional Email",
        "Zod Schema Validation",
      ],
    },
    {
      category: isRtl ? "النمو والتسويق الرقمي" : "Growth & Digital Marketing",
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
      institution: isRtl ? "جامعة دار العلوم كراتشي" : "Jamia Darul Uloom Karachi",
      degree: isRtl ? "ماجستير في الدراسات الإسلامية واللغة العربية" : "M.A. Arabic & Islamic Studies",
      date: isRtl ? "أنجزت في 10 أغسطس 2020" : "Completed August 10, 2020",
    },
    {
      institution: isRtl ? "معهد عثمان بن عفان" : "Mahad Uthman Bin Affan",
      degree: isRtl ? "دبلوم لمدة عام: تكنولوجيا المعلومات وتطوير الويب + اللغتين الإنجليزية والعربية" : "1-Year Diploma, CIT/DIT & Web Development + English + Arabic Language",
      date: isRtl ? "بدأت في 20 أكتوبر 2020" : "Started October 20, 2020",
    },
  ];

  const employment = [
    {
      role: isRtl ? "مطور ويب ومسوق رقمي مستقل" : "Self-Employed Web Developer & Marketer",
      organization: isRtl ? "أكاديمية قرآنية على الإنترنت (Quranific.com وQuran Gateway LMS)" : "Online Quran Academy (Quranific.com & Quran Gateway LMS)",
      period: isRtl ? "2022 — حتى الآن" : "2022 — Present",
      description: isRtl
        ? "هندسة منصات ويب متكاملة، ودليل الدورات، وفصول افتراضية مباشرة، وأنظمة تسعير متعددة المستويات، ومسارات تحويل واستقطاب رقمية."
        : "Architecting full-stack web platforms, course catalogs, live virtual classrooms, tiered billing systems, and conversion-focused acquisition funnels.",
    },
    {
      role: isRtl ? "مدقق لغوي وعضو فريق الدعم" : "Book Proofreader & Support Staff",
      organization: isRtl ? "مكتبة البشرى" : "Maktaba Al-Bushra",
      period: isRtl ? "20 ديسمبر 2021 — 23 يناير 2024" : "Dec 20, 2021 — Jan 23, 2024",
      description: isRtl
        ? "المراجعة التحريرية، والتدقيق اللغوي للأعمال الأكاديمية والمطبوعات، والدعم التشغيلي للنشر."
        : "Editorial review, academic text proofreading, and operational publishing support.",
    },
    {
      role: isRtl ? "مطور ويب وتسويق" : "Web Developer & Marketing",
      organization: isRtl ? "وكالة الحرمين للسياحة والسفر" : "Haramen Travel Agency",
      period: isRtl ? "12 نوفمبر 2020 — 25 أكتوبر 2021" : "Nov 12, 2020 — Oct 25, 2021",
      description: isRtl
        ? "تطوير مواقع الويب، وصيانة البوابات الإلكترونية، وتنسيق حملات التسويق للسياحة والسفر."
        : "Website development, online portal maintenance, and travel marketing campaign coordination.",
    },
  ];

  const languages = [
    { name: isRtl ? "الإنجليزية" : "English", level: isRtl ? "كفاءة مهنية كاملة" : "Professional working proficiency" },
    { name: isRtl ? "العربية" : "Arabic", level: isRtl ? "كفاءة أكاديمية ومتقدمة" : "Advanced / Academic proficiency" },
    { name: isRtl ? "الأردية" : "Urdu", level: isRtl ? "اللغة الأم" : "Native / Bilingual" },
    { name: isRtl ? "البشتوية" : "Pashto", level: isRtl ? "اللغة الأم" : "Native / Bilingual" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <JsonLd data={jsonLd} />

      {/* Header Bio */}
      <section aria-labelledby="about-heading" className="space-y-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {t("profileBadge")}
        </div>
        <h1
          id="about-heading"
          className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl dark:text-white"
        >
          {t("heading")}
        </h1>

        <div className="prose prose-gray max-w-none text-base leading-relaxed text-gray-700 space-y-4 dark:text-gray-300">
          <p>{t("bioP1")}</p>
          <p>{t("bioP2")}</p>
        </div>

        <div>
          <TrackedAnchor
            href="/resume.pdf"
            download="Faisal-Khan-Resume.pdf"
            event={{
              name: "resume_download",
              properties: { url: "/resume.pdf", source: "about_page" },
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-800 shadow-2xs transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
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
            <span>{t("downloadResume")}</span>
          </TrackedAnchor>
        </div>
      </section>

      {/* Employment History */}
      <section aria-labelledby="experience-heading" className="scroll-reveal mt-16 border-t border-gray-200 pt-12 dark:border-gray-800">
        <h2 id="experience-heading" className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
          {t("employmentHeading")}
        </h2>
        <div className="mt-6 space-y-6">
          {employment.map((job) => (
            <div
              key={job.role}
              className="scroll-reveal rounded-xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-950 dark:text-white">{job.role}</h3>
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400">{job.organization}</div>
                </div>
                <div className="mt-1 text-xs font-semibold text-gray-600 sm:mt-0 dark:text-gray-400">
                  {job.period}
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed dark:text-gray-300">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section aria-labelledby="education-heading" className="scroll-reveal mt-16 border-t border-gray-200 pt-12 dark:border-gray-800">
        <h2 id="education-heading" className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
          {t("educationHeading")}
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="scroll-reveal rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">{edu.date}</div>
              <h3 className="mt-2 text-base font-bold text-gray-950 dark:text-white">{edu.degree}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{edu.institution}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section aria-labelledby="languages-heading" className="scroll-reveal mt-16 border-t border-gray-200 pt-12 dark:border-gray-800">
        <h2 id="languages-heading" className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
          {t("languagesHeading")}
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="scroll-reveal rounded-lg border border-gray-200 bg-white p-4 text-center shadow-2xs dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="text-base font-bold text-gray-950 dark:text-white">{lang.name}</div>
              <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">{lang.level}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Matrix */}
      <section aria-labelledby="skills-heading" className="scroll-reveal mt-16 border-t border-gray-200 pt-12 dark:border-gray-800">
        <h2 id="skills-heading" className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
          {t("skillsHeading")}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {t("skillsSubheading")}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {skills.map((skillGroup, idx) => (
            <div
              key={skillGroup.category}
              className={`scroll-reveal ${idx === 1 ? "scroll-reveal-delay-1" : idx === 2 ? "scroll-reveal-delay-2" : ""} rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900`}
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-950 dark:text-gray-200">
                {skillGroup.category}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {skillGroup.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Work Principles */}
      <section aria-labelledby="principles-heading" className="scroll-reveal mt-16 border-t border-gray-200 pt-12 dark:border-gray-800">
        <h2 id="principles-heading" className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
          {t("principlesHeading")}
        </h2>

        <div className="mt-6 space-y-6">
          <div className="scroll-reveal rounded-lg border-s-4 border-blue-600 bg-white p-5 shadow-xs dark:border-blue-500 dark:bg-gray-900">
            <h3 className="font-bold text-gray-950 dark:text-white">{t("p1Title")}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {t("p1Desc")}
            </p>
          </div>

          <div className="scroll-reveal rounded-lg border-s-4 border-blue-600 bg-white p-5 shadow-xs dark:border-blue-500 dark:bg-gray-900">
            <h3 className="font-bold text-gray-950 dark:text-white">{t("p2Title")}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {t("p2Desc")}
            </p>
          </div>

          <div className="scroll-reveal rounded-lg border-s-4 border-blue-600 bg-white p-5 shadow-xs dark:border-blue-500 dark:bg-gray-900">
            <h3 className="font-bold text-gray-950 dark:text-white">{t("p3Title")}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {t("p3Desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section aria-label="Contact CTA" className="scroll-reveal mt-16 rounded-2xl bg-gray-50 border border-gray-200 p-8 text-center sm:p-10 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-950 sm:text-2xl dark:text-white">
          {t("ctaHeading")}
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-gray-600 dark:text-gray-300">
          {t("ctaSubheading")}
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-lg bg-gray-950 px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-blue-600 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
          >
            {isRtl ? "تواصل معي" : "Get in touch"}
          </Link>
          <Link
            href="/work"
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-xs transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {t("browseWork")}
          </Link>
        </div>
      </section>
    </div>
  );
}
