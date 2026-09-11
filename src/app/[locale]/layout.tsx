import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getPersonSchema, getWebSiteSchema, SITE_CONFIG } from "@/lib/metadata";
import { ScrollRevealProvider } from "@/components/motion/ScrollRevealProvider";
import "../globals.css";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-arabic",
  display: "swap",
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default:
        locale === "ar"
          ? "فيصل خان — مطور ويب وخبير تسويق رقمي"
          : `${SITE_CONFIG.name} — Web Developer & Digital Marketer`,
      template:
        locale === "ar"
          ? `%s | فيصل خان`
          : `%s | ${SITE_CONFIG.name}`,
    },
    description:
      locale === "ar"
        ? "فيصل خان مطور ويب وخبير تسويق رقمي يهندس تطبيقات ويب عالية الأداء ومسارات تحويل تحقق نتائج أعمال ملموسة."
        : SITE_CONFIG.description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}`,
      languages: {
        en: `${SITE_CONFIG.url}/en`,
        ar: `${SITE_CONFIG.url}/ar`,
        "x-default": `${SITE_CONFIG.url}/en`,
      },
    },
    openGraph: {
      title:
        locale === "ar"
          ? "فيصل خان — مطور ويب وخبير تسويق رقمي"
          : `${SITE_CONFIG.name} — Web Developer & Digital Marketer`,
      description:
        locale === "ar"
          ? "فيصل خان مطور ويب وخبير تسويق رقمي يهندس تطبيقات ويب عالية الأداء ومسارات تحويل تحقق نتائج أعمال ملموسة."
          : SITE_CONFIG.description,
      url: `${SITE_CONFIG.url}/${locale}`,
      siteName: locale === "ar" ? "فيصل خان" : SITE_CONFIG.name,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: locale === "ar" ? "معرض أعمال فيصل خان" : `${SITE_CONFIG.name} Portfolio`,
        },
      ],
      locale: locale === "ar" ? "ar_AR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title:
        locale === "ar"
          ? "فيصل خان — مطور ويب وخبير تسويق رقمي"
          : `${SITE_CONFIG.name} — Web Developer & Digital Marketer`,
      description:
        locale === "ar"
          ? "فيصل خان مطور ويب وخبير تسويق رقمي يهندس تطبيقات ويب عالية الأداء ومسارات تحويل تحقق نتائج أعمال ملموسة."
          : SITE_CONFIG.description,
      creator: SITE_CONFIG.twitterHandle,
      images: [SITE_CONFIG.ogImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  // Filter messages to only namespaces consumed by client components
  // to prevent serializing unnecessary dictionaries into the initial HTML payload.
  const clientMessages = {
    Theme: messages.Theme,
    Language: messages.Language,
    Contact: messages.Contact,
  };
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;

  const isDarkServer = themeCookie === "dark";
  const initialHtmlClass = `scroll-smooth ${isDarkServer ? "dark" : ""}`.trim();
  const initialColorScheme = isDarkServer ? "dark" : themeCookie === "light" ? "light" : undefined;
  const isRtl = locale === "ar";

  const personJsonLd = getPersonSchema();
  const websiteJsonLd = getWebSiteSchema();

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${initialHtmlClass} ${isRtl ? ibmPlexSansArabic.variable : ""}`}
      style={initialColorScheme ? { colorScheme: initialColorScheme } : undefined}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {/* Zero-Flash Theme Initialization for first-time visitors lacking a theme cookie */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=localStorage.getItem('theme'),d=window.matchMedia('(prefers-color-scheme: dark)').matches,t=s||(d?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');document.documentElement.style.colorScheme=t;}catch(_){}`,
          }}
        />
      </head>
      <body
        className={`flex min-h-screen flex-col bg-white text-gray-900 antialiased selection:bg-blue-600 selection:text-white dark:bg-gray-950 dark:text-gray-100 transition-colors duration-200 ${
          isRtl ? "font-sans font-arabic" : "font-sans"
        }`}
      >
        <NextIntlClientProvider messages={clientMessages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <ScrollRevealProvider />
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
