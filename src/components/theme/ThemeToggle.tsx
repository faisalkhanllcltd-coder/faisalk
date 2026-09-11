"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "@teispace/next-themes";
import { useTranslations } from "next-intl";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
  const t = useTranslations("Theme");

  if (!mounted) {
    return (
      <div
        className="h-9 w-9 rounded-lg border border-gray-200 bg-transparent dark:border-gray-800"
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const targetTheme = isDark ? "light" : "dark";
  const label = isDark ? t("switchToLight") : t("switchToDark");

  const handleToggle = () => {
    // Set cookie for zero-flash server-side rendering on returning visits
    document.cookie = `theme=${targetTheme}; path=/; max-age=31536000; SameSite=Lax`;

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(targetTheme);
      return;
    }

    document.startViewTransition(() => {
      setTheme(targetTheme);
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-xs transition hover:bg-gray-100 hover:text-gray-950 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:focus-visible:ring-blue-400"
    >
      {isDark ? (
        // Sun icon for dark mode (click to switch to light)
        <svg
          className="h-4 w-4 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        // Moon icon for light mode (click to switch to dark)
        <svg
          className="h-4 w-4 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
