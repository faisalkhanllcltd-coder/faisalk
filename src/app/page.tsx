import Link from "next/link";
import { getAllCaseStudies } from "@/lib/case-studies";
import { Hero3D } from "@/components/hero/Hero3D";
import { DotLottieIcon } from "@/components/ui/DotLottieIcon";

export default async function HomePage() {
  const caseStudies = await getAllCaseStudies();
  const featuredStudies = caseStudies.filter((study) => study.featured).slice(0, 2);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
      {/* Hero Section */}
      <section aria-labelledby="hero-heading" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <div className="space-y-6 lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-700/10 ring-inset">
            <DotLottieIcon
              src="/lottie/status-pulse.lottie"
              className="w-2.5 h-2.5"
              fallback={<span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" aria-hidden="true" />}
            />
            Available for Select Contracts &amp; Full-Time Roles
          </div>

          <h1
            id="hero-heading"
            className="text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl md:text-6xl leading-[1.1]"
          >
            Building high-performance web products that{" "}
            <span className="text-blue-600">drive qualified leads.</span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed sm:text-xl">
            I am a web developer and digital marketer based in Karachi, Pakistan. I engineer modern web applications, scalable learning platforms, and conversion-focused architectures.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-lg bg-gray-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <span>View Case Studies</span>
              <DotLottieIcon
                src="/lottie/arrow-interaction.lottie"
                className="w-3.5 h-3.5"
                loop={false}
                hover={true}
                fallback={<span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>}
              />
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 shadow-xs transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Start a Conversation
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 w-full">
          <Hero3D />
        </div>
      </section>

      {/* Metrics Proof Bar */}
      <section
        aria-label="Key Outcomes"
        className="scroll-reveal mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:grid-cols-4 sm:p-8"
      >
        <div>
          <div className="text-3xl font-extrabold text-gray-950 sm:text-4xl">9</div>
          <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-600">Live Courses Shipped</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-gray-950 sm:text-4xl">14</div>
          <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-600">Staff Permission Modules</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-gray-950 sm:text-4xl">~90%</div>
          <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-600">LMS Platform Built</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-gray-950 sm:text-4xl">Full Month</div>
          <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-600">Satisfaction Guarantee</div>
        </div>
      </section>

      {/* Featured Work */}
      <section aria-labelledby="featured-heading" className="scroll-reveal mt-24">
        <div className="flex items-end justify-between">
          <div>
            <h2 id="featured-heading" className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Featured Case Studies
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-xl">
              Real production systems and web applications engineered with modern full-stack standards and verified deliverables.
            </p>
          </div>
          <Link
            href="/work"
            className="hidden text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:inline"
          >
            All case studies &rarr;
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {featuredStudies.map((study) => (
            <article
              key={study.slug}
              className="scroll-reveal flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition hover:border-blue-300 hover:shadow-md sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                  <span>{study.client}</span>
                  <span>{study.timeline}</span>
                </div>

                <h3 className="mt-3 text-xl font-bold tracking-tight text-gray-950">
                  <Link href={`/work/${study.slug}`} className="hover:text-blue-600 transition">
                    {study.title}
                  </Link>
                </h3>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{study.summary}</p>

                <div className="mt-6 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3">
                  {study.metrics.slice(0, 2).map((metric) => (
                    <div key={metric.label}>
                      <div className="text-lg font-extrabold text-blue-600">{metric.value}</div>
                      <div className="text-[11px] font-medium text-gray-500">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {study.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/work/${study.slug}`}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Read study &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Core Competencies */}
      <section aria-labelledby="services-heading" className="scroll-reveal mt-24 border-t border-gray-200 pt-16">
        <h2 id="services-heading" className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
          Core Competencies
        </h2>
        <p className="mt-2 text-sm text-gray-600 max-w-xl">
          Engineered to convert visitors into customers through technical excellence and strategic distribution.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="scroll-reveal rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
            <div className="text-lg font-bold text-gray-950">1. Full-Stack Web Development</div>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Production Next.js App Router, React 19, TypeScript, and Tailwind CSS. Clean, maintainable architectures built for speed, responsiveness, and zero technical debt.
            </p>
          </div>

          <div className="scroll-reveal scroll-reveal-delay-1 rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
            <div className="text-lg font-bold text-gray-950">2. Technical SEO &amp; Indexation</div>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Granular schema.org JSON-LD structured data, dynamic XML sitemaps, fast TTFB, and Core Web Vitals optimization to win high-intent search visibility.
            </p>
          </div>

          <div className="scroll-reveal scroll-reveal-delay-2 rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
            <div className="text-lg font-bold text-gray-950">3. Conversion Rate Optimization (CRO)</div>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Frictionless form design, checkout flow engineering, client-side event tracking, and data-backed UX decisions that increase inquiry rates.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section aria-labelledby="cta-heading" className="scroll-reveal mt-24 rounded-2xl bg-gray-950 p-8 text-center text-white sm:p-12">
        <h2 id="cta-heading" className="text-2xl font-bold sm:text-3xl">
          Need a developer who understands growth?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-gray-300 sm:text-base">
          Whether you need a full web platform re-architecture, a high-converting marketing site, or technical SEO leadership, let&apos;s discuss your goals.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Schedule a Consultation
          </Link>
          <Link
            href="/about"
            className="rounded-lg border border-gray-700 bg-transparent px-6 py-3 text-sm font-semibold text-gray-300 transition hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Learn More About Me
          </Link>
        </div>
      </section>
    </div>
  );
}
