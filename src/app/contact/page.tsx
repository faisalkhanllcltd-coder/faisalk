import { constructMetadata, getContactPageSchema, SITE_CONFIG } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";

export const metadata = constructMetadata({
  title: "Contact",
  description:
    "Get in touch with Faisal Khan for web development engagements, technical SEO, conversion rate optimization, or full-time opportunities.",
  path: "/contact",
});

export default function ContactPage() {
  const jsonLd = getContactPageSchema();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <JsonLd data={jsonLd} />

      <header className="space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Get in Touch
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
          Let&apos;s build something high-impact.
        </h1>
        <p className="max-w-2xl text-base text-gray-600 sm:text-lg leading-relaxed">
          Whether you have an upcoming web development project, need a technical performance audit, or want to discuss full-time engineering roles, I&apos;d love to connect.
        </p>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Contact Info Column */}
        <div className="space-y-8 lg:col-span-1">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-950">Direct Email</h2>
            <p className="mt-2 text-sm text-gray-600">
              For project scopes, RFPs, or direct inquiries:
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="mt-1 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              {SITE_CONFIG.email}
            </a>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-950">Profiles</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a
                  href={SITE_CONFIG.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  GitHub &rarr;
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  LinkedIn &rarr;
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950">Availability</h2>
            <p className="mt-2 text-xs text-gray-600 leading-relaxed">
              Currently accepting select contract opportunities and open to conversations regarding senior frontend engineering roles.
            </p>
          </div>
        </div>

        {/* Lead Capture Form Column */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:p-8 lg:col-span-2">
          <h2 className="text-xl font-bold tracking-tight text-gray-950">Send a Message</h2>
          <p className="mt-1 text-sm text-gray-600">
            Fill out the details below and I will respond within 24 business hours.
          </p>

          <form className="mt-6 space-y-5" action="#" method="POST">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                autoComplete="name"
                placeholder="Jane Doe"
                className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-950 placeholder-gray-400 shadow-2xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                Work Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                placeholder="jane@company.com"
                className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-950 placeholder-gray-400 shadow-2xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="projectType" className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                Inquiry Type
              </label>
              <select
                id="projectType"
                name="projectType"
                className="mt-1.5 block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-950 shadow-2xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="full-stack">Full-Stack Web Development</option>
                <option value="seo-cro">Technical SEO &amp; CRO Audit</option>
                <option value="headless">Headless Commerce Architecture</option>
                <option value="full-time">Full-Time Engineering Role</option>
                <option value="advisory">Consulting &amp; Advisory</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                Project Details or Objective <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Tell me about your timeline, business goals, and technical requirements..."
                className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-950 placeholder-gray-400 shadow-2xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gray-950 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
