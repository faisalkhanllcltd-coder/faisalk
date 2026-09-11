import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { routing } from "@/i18n/routing";
import { getAllCaseStudySlugs, getCaseStudyBySlug } from "@/lib/case-studies";
import { constructMetadata, getCaseStudySchema } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import { mdxComponents } from "@/components/MdxComponents";
import { CaseStudyReadingTracker } from "@/components/analytics/CaseStudyReadingTracker";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = await getCaseStudyBySlug(slug, locale);

  if (!study) {
    return constructMetadata({
      title: locale === "ar" ? "دراسة الحالة غير موجودة" : "Case Study Not Found",
      description: locale === "ar" ? "تعذر العثور على دراسة الحالة المطلوبة." : "The requested case study could not be found.",
      locale,
    });
  }

  return constructMetadata({
    title: `${study.metadata.title} | ${locale === "ar" ? "دراسة حالة" : "Case Study"}`,
    description: study.metadata.summary,
    path: `/work/${slug}`,
    locale,
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Work" });
  const study = await getCaseStudyBySlug(slug, locale);

  if (!study) {
    notFound();
  }

  const { metadata, content } = study;
  const jsonLd = getCaseStudySchema(metadata);

  return (
    <article className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <JsonLd data={jsonLd} />
      <CaseStudyReadingTracker slug={slug} />

      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/work"
          className="inline-flex items-center text-sm font-medium text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        >
          <span aria-hidden="true" className="me-2 rtl:rotate-180 inline-block">&larr;</span>
          {t("backToAll")}
        </Link>
      </div>

      {/* Header Info */}
      <header className="border-b border-gray-200 pb-10 dark:border-gray-800">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
          <span className="rounded-md bg-blue-50 px-2.5 py-1 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">{metadata.client}</span>
          <span>&bull;</span>
          <span>{metadata.role}</span>
          <span>&bull;</span>
          <span>{metadata.timeline}</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl dark:text-white">
          {metadata.title}
        </h1>

        <p className="mt-4 text-lg text-gray-600 leading-relaxed sm:text-xl dark:text-gray-300">
          {metadata.summary}
        </p>

        {/* Highlighted Results Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6 sm:grid-cols-4 dark:border-gray-800 dark:bg-gray-900">
          {metadata.metrics.map((metric) => (
            <div key={metric.label} className="text-center sm:text-start">
              <div className="text-2xl font-extrabold text-blue-600 sm:text-3xl dark:text-blue-400">{metric.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {metadata.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* MDX Content */}
      <section className="mt-10 max-w-none prose dark:prose-invert">
        <MDXRemote source={content} components={mdxComponents} />
      </section>

      {/* Bottom Conversion Section */}
      <footer className="mt-16 border-t border-gray-200 pt-12 dark:border-gray-800">
        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-8 text-center sm:p-10 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-2xl font-bold text-gray-950 dark:text-white">
            {t("similarChallenge")}
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-gray-600 dark:text-gray-300">
            {t("similarDesc")}
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-gray-950 px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-blue-600 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
            >
              {locale === "ar" ? "ابدأ التواصل" : "Start a Conversation"}
            </Link>
            <Link
              href="/work"
              className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-xs transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {t("viewMore")}
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
