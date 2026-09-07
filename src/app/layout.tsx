import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getPersonSchema, getWebSiteSchema, SITE_CONFIG } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — Web Developer & Digital Marketer`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: `${SITE_CONFIG.name} — Web Developer & Digital Marketer`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Portfolio`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — Web Developer & Digital Marketer`,
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.twitterHandle,
    images: [SITE_CONFIG.ogImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = getPersonSchema();
  const websiteJsonLd = getWebSiteSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-gray-900 antialiased selection:bg-blue-600 selection:text-white">
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
