import Link from "next/link";

export function Header() {
  return (
    <>
      {/* WCAG 2.2 AA Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-gray-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-gray-950 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm"
          >
            Faisal Khan
            <span className="ml-2 hidden text-xs font-normal text-gray-500 sm:inline">
              Web Developer &amp; Marketer
            </span>
          </Link>

          <nav aria-label="Main Navigation">
            <ul className="flex items-center space-x-6 text-sm font-medium text-gray-600">
              <li>
                <Link
                  href="/about"
                  className="inline-block py-2 transition hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="inline-block py-2 transition hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-gray-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Get in touch
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
