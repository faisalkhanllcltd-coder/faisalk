import type { Metadata } from "next";
import type { CaseStudyMetadata } from "./case-studies";

export const SITE_CONFIG = {
  name: "Faisal Khan",
  title: "Faisal Khan — Web Developer & Digital Marketer",
  description:
    "Faisal Khan is a web developer and digital marketer engineering high-performance web applications and conversion funnels that drive qualified business outcomes.",
  url: "https://www.faisalk.dev",
  ogImage: "https://www.faisalk.dev/og-default.png",
  twitterHandle: "@faisalkhandev",
  email: "contact@faisalk.dev",
  github: "https://github.com/faisalkhanllcltd-coder",
  linkedin: "https://linkedin.com/in/faisalkhan",
};

/**
 * Dedicated recipient email address for internal lead form dispatch via Resend.
 * Kept strictly isolated from SITE_CONFIG.email (the public-facing address).
 */
export const CONTACT_FORM_RECIPIENT = "faisalkhan.llc.ltd@gmail.com";

/**
 * Helper to construct page-specific metadata with OpenGraph and Twitter cards.
 */
export function constructMetadata({
  title,
  description,
  path = "",
  image,
  locale = "en",
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  locale?: string;
} = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.title;
  const pageDescription = description || SITE_CONFIG.description;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const normalizedPath = cleanPath === "/" ? "" : cleanPath;
  const pageUrl = `${SITE_CONFIG.url}/${locale}${normalizedPath}`;
  const pageImage = image || SITE_CONFIG.ogImage;

  return {
    title: title || SITE_CONFIG.title,
    description: pageDescription,
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${SITE_CONFIG.url}/en${normalizedPath}`,
        ar: `${SITE_CONFIG.url}/ar${normalizedPath}`,
        "x-default": `${SITE_CONFIG.url}/en${normalizedPath}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: locale === "ar" ? "ar_AR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: pageDescription,
      creator: SITE_CONFIG.twitterHandle,
      images: [pageImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Schema.org Person JSON-LD
 */
export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.name,
    jobTitle: "Web Developer & Digital Marketer",
    url: SITE_CONFIG.url,
    sameAs: [SITE_CONFIG.github, SITE_CONFIG.linkedin],
    description: SITE_CONFIG.description,
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Core Web Vitals",
      "Conversion Rate Optimization",
      "Technical SEO",
      "Digital Marketing",
      "Web Accessibility (WCAG 2.2)",
    ],
  };
}

/**
 * Schema.org WebSite JSON-LD
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.title,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.name,
    },
  };
}

/**
 * Schema.org CreativeWork / Article JSON-LD for Case Studies
 */
export function getCaseStudySchema(study: CaseStudyMetadata) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: study.title,
    description: study.summary,
    url: `${SITE_CONFIG.url}/work/${study.slug}`,
    datePublished: study.date,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.name,
    },
    keywords: study.tags.join(", "),
    creator: {
      "@type": "Person",
      name: SITE_CONFIG.name,
    },
    about: {
      "@type": "Thing",
      name: study.client,
    },
  };
}

/**
 * Schema.org CollectionPage for Work index
 */
export function getWorkCollectionSchema(studies: CaseStudyMetadata[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Client Case Studies & Engineering Work",
    description: "Detailed case studies documenting full-stack web applications, technical SEO, and conversion rate optimization.",
    url: `${SITE_CONFIG.url}/work`,
    hasPart: studies.map((study) => ({
      "@type": "CreativeWork",
      headline: study.title,
      url: `${SITE_CONFIG.url}/work/${study.slug}`,
      description: study.summary,
    })),
  };
}

/**
 * Schema.org AboutPage
 */
export function getAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Faisal Khan — Web Developer & Digital Marketer",
    description: "Learn about Faisal Khan's technical background, frontend engineering capabilities, and conversion-focused digital marketing philosophy.",
    url: `${SITE_CONFIG.url}/about`,
    mainEntity: getPersonSchema(),
  };
}

/**
 * Schema.org ContactPage
 */
export function getContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Faisal Khan",
    description: "Get in touch with Faisal Khan for web development projects, marketing advisory, or full-time opportunities.",
    url: `${SITE_CONFIG.url}/contact`,
    mainEntity: {
      "@type": "Person",
      name: SITE_CONFIG.name,
      email: SITE_CONFIG.email,
    },
  };
}
