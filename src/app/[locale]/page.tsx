import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllCaseStudies } from "@/lib/case-studies";
import { Hero3D } from "@/components/hero/Hero3D";
import { DotLottieIcon } from "@/components/ui/DotLottieIcon";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations({ locale, namespace: "Hero" });
  const tProof = await getTranslations({ locale, namespace: "ProofBar" });
  const tWork = await getTranslations({ locale, namespace: "FeaturedWork" });
  const tComp = await getTranslations({ locale, namespace: "Competencies" });
  const tCta = await getTranslations({ locale, namespace: "CtaBanner" });

  const caseStudies = await getAllCaseStudies(locale);
  const featuredStudies = caseStudies.filter((study) => study.featured).slice(0, 2);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
      {/* Hero Section */}
      <section aria-labelledby="hero-heading" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <div className="space-y-6 lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-700/10 ring-inset dark:bg-blue-950/60 dark:text-blue-300 dark:ring-blue-500/30">
            <DotLottieIcon
              src="/lottie/status-pulse.lottie"
              className="w-2.5 h-2.5"
              fallback={<span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" aria-hidden="true" />}
            />
            {tHero("availabilityBadge")}
          </div>

          <h1
            id="hero-heading"
            className="text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl md:text-6xl leading-[1.1] dark:text-white"
          >
            {tHero("titleLine1")}{" "}
            <span className="text-blue-600 dark:text-blue-400">{tHero("titleHighlight")}</span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed sm:text-xl dark:text-gray-300">
            {tHero("subtitle")}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-lg bg-gray-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
            >
              <span>{tHero("viewWork")}</span>
              <span className="rtl:rotate-180 inline-block transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden="true">
                &rarr;
              </span>
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 shadow-xs transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {tHero("startConversation")}
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 w-full">
          <Hero3D />
        </div>
      </section>

      {/* Metrics Proof Bar */}
      <section
        aria-label={tProof("coursesLabel")}
        className="scroll-reveal mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:grid-cols-4 sm:p-8 dark:border-gray-800 dark:bg-gray-900"
      >
        <div>
          <div className="text-3xl font-extrabold text-gray-950 sm:text-4xl dark:text-white">{tProof("coursesCount")}</div>
          <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">{tProof("coursesLabel")}</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-gray-950 sm:text-4xl dark:text-white">{tProof("modulesCount")}</div>
          <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">{tProof("modulesLabel")}</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-gray-950 sm:text-4xl dark:text-white">{tProof("lmsCount")}</div>
          <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">{tProof("lmsLabel")}</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-gray-950 sm:text-4xl dark:text-white">{tProof("guaranteeCount")}</div>
          <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">{tProof("guaranteeLabel")}</div>
        </div>
      </section>

      {/* Featured Work */}
      <section aria-labelledby="featured-heading" className="scroll-reveal mt-24">
        <div className="flex items-end justify-between">
          <div>
            <h2 id="featured-heading" className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl dark:text-white">
              {tWork("heading")}
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-xl dark:text-gray-400">
              {tWork("subheading")}
            </p>
          </div>
          <Link
            href="/work"
            className="hidden text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:inline dark:text-blue-400 dark:hover:text-blue-300"
          >
            {tWork("allCaseStudies")} <span className="rtl:rotate-180 inline-block" aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {featuredStudies.map((study) => (
            <article
              key={study.slug}
              className="scroll-reveal flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition hover:border-blue-300 hover:shadow-md sm:p-8 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-gray-400">
                  <span>{study.client}</span>
                  <span>{study.timeline}</span>
                </div>

                <h3 className="mt-3 text-xl font-bold tracking-tight text-gray-950 dark:text-white">
                  <Link href={`/work/${study.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                    {study.title}
                  </Link>
                </h3>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed dark:text-gray-300">{study.summary}</p>

                <div className="mt-6 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/60">
                  {study.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.label}>
                      <div className="text-lg font-extrabold text-blue-600 dark:text-blue-400">{metric.value}</div>
                      <div className="text-[11px] font-medium text-gray-600 dark:text-gray-400">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                <div className="flex flex-wrap gap-1.5">
                  {study.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/work/${study.slug}`}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {tWork("readStudy")} <span className="rtl:rotate-180 inline-block" aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Core Competencies */}
      <section aria-labelledby="services-heading" className="scroll-reveal mt-24 border-t border-gray-200 pt-16 dark:border-gray-800">
        <h2 id="services-heading" className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl dark:text-white">
          {tComp("heading")}
        </h2>
        <p className="mt-2 text-sm text-gray-600 max-w-xl dark:text-gray-400">
          {tComp("subheading")}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="scroll-reveal rounded-xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
            <div className="text-lg font-bold text-gray-950 dark:text-white">{tComp("item1Title")}</div>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed dark:text-gray-300">
              {tComp("item1Desc")}
            </p>
          </div>

          <div className="scroll-reveal scroll-reveal-delay-1 rounded-xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
            <div className="text-lg font-bold text-gray-950 dark:text-white">{tComp("item2Title")}</div>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed dark:text-gray-300">
              {tComp("item2Desc")}
            </p>
          </div>

          <div className="scroll-reveal scroll-reveal-delay-2 rounded-xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
            <div className="text-lg font-bold text-gray-950 dark:text-white">{tComp("item3Title")}</div>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed dark:text-gray-300">
              {tComp("item3Desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section aria-labelledby="cta-heading" className="scroll-reveal mt-24 rounded-2xl bg-gray-950 p-8 text-center text-white sm:p-12 dark:bg-gray-900 border border-transparent dark:border-gray-800">
        <h2 id="cta-heading" className="text-2xl font-bold sm:text-3xl">
          {tCta("heading")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-300 sm:text-base">
          {tCta("subheading")}
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            {tCta("primaryBtn")}
          </Link>
          <Link
            href="/about"
            className="rounded-lg border border-gray-700 bg-transparent px-6 py-3 text-sm font-semibold text-gray-300 transition hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white dark:border-gray-600 dark:hover:bg-gray-800"
          >
            {tCta("secondaryBtn")}
          </Link>
        </div>
      </section>
    </div>
  );
}
