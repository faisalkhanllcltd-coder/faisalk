"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

export function Header() {
  const t = useTranslations("Navigation");

  return (
    <>
      {/* WCAG 2.2 AA Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:rounded-md focus:bg-gray-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:bg-white dark:focus:text-gray-950"
      >
        {t("skipToContent")}
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/90 transition-colors duration-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="rounded-sm text-lg font-bold tracking-tight text-gray-950 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-gray-100 dark:hover:text-blue-400"
          >
            Faisal Khan
            <span className="ms-2 hidden text-xs font-normal text-gray-500 sm:inline dark:text-gray-400">
              {t("brandRole")}
            </span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <nav aria-label={t("brandRole")}>
              <ul className="flex items-center gap-4 text-sm font-medium text-gray-600 sm:gap-6 dark:text-gray-400">
                <li>
                  <Link
                    href="/about"
                    className="inline-block py-2 transition hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm dark:hover:text-white"
                  >
                    {t("about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work"
                    className="inline-block py-2 transition hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm dark:hover:text-white"
                  >
                    {t("work")}
                  </Link>
                </li>
                <li className="hidden sm:inline-block">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-gray-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
                  >
                    {t("getInTouch")}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-2 border-s border-gray-200 ps-3 sm:ps-4 dark:border-gray-800">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
