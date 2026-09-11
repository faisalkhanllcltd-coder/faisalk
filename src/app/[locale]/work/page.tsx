import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllCaseStudies } from "@/lib/case-studies";
import { constructMetadata, getWorkCollectionSchema } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";

interface WorkPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Work" });

  return constructMetadata({
    title: locale === "ar" ? "دراسات الحالة والمشاريع" : "Case Studies & Work",
    description: t("subheading"),
    path: "/work",
    locale,
  });
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Work" });
  const caseStudies = await getAllCaseStudies(locale);
  const jsonLd = getWorkCollectionSchema(caseStudies);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
      <JsonLd data={jsonLd} />

      <header className="space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {t("portfolioBadge")}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl dark:text-white">
          {t("heading")}
        </h1>
        <p className="max-w-2xl text-base text-gray-600 sm:text-lg leading-relaxed dark:text-gray-300">
          {t("subheading")}
        </p>
      </header>

      <div className="mt-12 space-y-12">
        {caseStudies.map((study, idx) => (
          <article
            key={study.slug}
            className={`${idx > 0 ? "scroll-reveal" : ""} rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition hover:border-blue-300 hover:shadow-md sm:p-8 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
              <span className="rounded-md bg-blue-50 px-2.5 py-1 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">{study.client}</span>
              <span>{study.role} &bull; {study.timeline}</span>
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl dark:text-white">
              <Link href={`/work/${study.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                {study.title}
              </Link>
            </h2>

            <p className="mt-3 text-base text-gray-600 leading-relaxed dark:text-gray-300">
              {study.summary}
            </p>

            {/* Metrics highlight grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:grid-cols-4 dark:border-gray-800 dark:bg-gray-800/60">
              {study.metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-xl font-extrabold text-blue-600 sm:text-2xl dark:text-blue-400">{metric.value}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-4 dark:border-gray-800">
              <div className="flex flex-wrap gap-1.5">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/work/${study.slug}`}
                className="inline-flex items-center text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {t("readFull")}{" "}
                <span aria-hidden="true" className="ms-1 rtl:rotate-180 inline-block">&rarr;</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
