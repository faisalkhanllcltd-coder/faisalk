"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Language");

  const targetLocale = locale === "en" ? "ar" : "en";
  const targetLabel = locale === "en" ? "العربية" : "English";
  const ariaLabel = locale === "en" ? t("switchToArabic") : t("switchToEnglish");

  return (
    <Link
      href={pathname}
      locale={targetLocale}
      aria-label={ariaLabel}
      title={ariaLabel}
      className="inline-flex h-9 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-700 shadow-xs transition hover:bg-gray-100 hover:text-gray-950 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:focus-visible:ring-blue-400"
    >
      <span className="leading-none">{targetLabel}</span>
    </Link>
  );
}
