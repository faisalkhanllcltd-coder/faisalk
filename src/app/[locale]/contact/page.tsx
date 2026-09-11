import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { constructMetadata, getContactPageSchema, SITE_CONFIG } from "@/lib/metadata";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/contact/ContactForm";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return constructMetadata({
    title: locale === "ar" ? "تواصل معي" : "Contact",
    description: t("subheading"),
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Contact" });
  const jsonLd = getContactPageSchema();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <JsonLd data={jsonLd} />

      <header className="space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {t("badge")}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl dark:text-white">
          {t("heading")}
        </h1>
        <p className="max-w-2xl text-base text-gray-600 sm:text-lg leading-relaxed dark:text-gray-300">
          {t("subheading")}
        </p>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Contact Info Column */}
        <div className="space-y-8 lg:col-span-1">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-950 dark:text-gray-200">
              {t("directEmail")}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {t("directEmailDesc")}
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="mt-1 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {SITE_CONFIG.email}
            </a>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-950 dark:text-gray-200">
              {t("profiles")}
            </h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a
                  href={SITE_CONFIG.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-700 hover:text-blue-600 transition dark:text-gray-300 dark:hover:text-blue-400 inline-flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <span aria-hidden="true" className="rtl:rotate-180 inline-block">&rarr;</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-700 hover:text-blue-600 transition dark:text-gray-300 dark:hover:text-blue-400 inline-flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <span aria-hidden="true" className="rtl:rotate-180 inline-block">&rarr;</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-950 dark:text-gray-200">
              {t("availability")}
            </h2>
            <p className="mt-2 text-xs text-gray-600 leading-relaxed dark:text-gray-400">
              {t("availabilityDesc")}
            </p>
          </div>
        </div>

        {/* Lead Capture Form Column */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:p-8 lg:col-span-2 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-xl font-bold tracking-tight text-gray-950 dark:text-white">
            {t("formHeading")}
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {t("formSubheading")}
          </p>

          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
