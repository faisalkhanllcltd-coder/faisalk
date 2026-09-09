import Link from "next/link";
import { SITE_CONFIG } from "@/lib/metadata";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 text-gray-600">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-base font-bold text-gray-950">Faisal Khan</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Web developer and digital marketer focused on high-performance web applications, technical SEO, and conversion engineering.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-950">Navigation</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-gray-950 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-950 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-gray-950 transition">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-950 transition">
                  Contact &amp; Inquiries
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-950">Connect</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-gray-950 transition"
                  aria-label="Send email to Faisal Khan"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-950 transition"
                  aria-label="Faisal Khan on GitHub (opens in new tab)"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-950 transition"
                  aria-label="Faisal Khan on LinkedIn (opens in new tab)"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-xs text-gray-600 flex flex-col sm:flex-row items-center justify-between">
          <p>&copy; {currentYear} Faisal Khan. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Built with Next.js 16, React 19 &amp; Tailwind CSS v4.</p>
        </div>
      </div>
    </footer>
  );
}
