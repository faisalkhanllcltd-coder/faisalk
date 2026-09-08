import Link from "next/link";
import { getAllCaseStudies } from "@/lib/case-studies";
import { constructMetadata, getWorkCollectionSchema } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";

export const metadata = constructMetadata({
  title: "Case Studies & Work",
  description:
    "Explore real-world client case studies detailing full-stack Next.js web development, technical SEO, and conversion rate optimization by Faisal Khan.",
  path: "/work",
});

export default async function WorkPage() {
  const caseStudies = await getAllCaseStudies();
  const jsonLd = getWorkCollectionSchema(caseStudies);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
      <JsonLd data={jsonLd} />

      <header className="space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Client Portfolio
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
          Engineered for impact. Measured in results.
        </h1>
        <p className="max-w-2xl text-base text-gray-600 sm:text-lg leading-relaxed">
          Every project featured here highlights a specific business objective, the technical architecture deployed to achieve it, and the verified metrics produced.
        </p>
      </header>

      <div className="mt-12 space-y-12">
        {caseStudies.map((study) => (
          <article
            key={study.slug}
            className="scroll-reveal rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition hover:border-blue-300 hover:shadow-md sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-gray-500">
              <span className="rounded-md bg-blue-50 px-2.5 py-1 text-blue-700">{study.client}</span>
              <span>{study.role} &bull; {study.timeline}</span>
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              <Link href={`/work/${study.slug}`} className="hover:text-blue-600 transition">
                {study.title}
              </Link>
            </h2>

            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              {study.summary}
            </p>

            {/* Metrics highlight grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:grid-cols-4">
              {study.metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-xl font-extrabold text-blue-600 sm:text-2xl">{metric.value}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-4">
              <div className="flex flex-wrap gap-1.5">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/work/${study.slug}`}
                className="inline-flex items-center text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Read full case study <span aria-hidden="true" className="ml-1">&rarr;</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
