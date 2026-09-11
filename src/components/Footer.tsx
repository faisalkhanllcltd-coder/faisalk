import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE_CONFIG } from "@/lib/metadata";

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const tNav = await getTranslations("Navigation");
  const tFooter = await getTranslations("Footer");

  return (
    <footer className="border-t border-gray-200 bg-gray-50 text-gray-600 transition-colors duration-200 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-base font-bold text-gray-950 dark:text-gray-100">Faisal Khan</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed dark:text-gray-300">
              {tFooter("bio")}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-950 dark:text-gray-200">
              {tFooter("navHeading")}
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/" className="transition hover:text-gray-950 dark:text-gray-300 dark:hover:text-white">
                  {tNav("about") === "About" ? "Home" : "الرئيسية"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-gray-950 dark:text-gray-300 dark:hover:text-white">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/work" className="transition hover:text-gray-950 dark:text-gray-300 dark:hover:text-white">
                  {tNav("work")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-gray-950 dark:text-gray-300 dark:hover:text-white">
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-950 dark:text-gray-200">
              {tFooter("connectHeading")}
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="transition hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
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
                  className="transition hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
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
                  className="transition hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
                  aria-label="Faisal Khan on LinkedIn (opens in new tab)"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-xs text-gray-600 flex flex-col sm:flex-row items-center justify-between dark:border-gray-800 dark:text-gray-400">
          <p>&copy; {currentYear} {tFooter("rights")}</p>
          <p className="mt-2 sm:mt-0">{tFooter("builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}
