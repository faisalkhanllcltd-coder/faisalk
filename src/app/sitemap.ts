import type { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import { SITE_CONFIG } from "@/lib/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseStudies = await getAllCaseStudies();
  const locales = ["en", "ar"] as const;

  const entries: MetadataRoute.Sitemap = [];

  // Static routes
  const staticPaths = ["", "/work", "/about", "/contact"];
  const priorities: Record<string, number> = {
    "": 1.0,
    "/work": 0.9,
    "/about": 0.8,
    "/contact": 0.7,
  };

  for (const path of staticPaths) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_CONFIG.url}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" || path === "/work" ? "weekly" : "monthly",
        priority: priorities[path] ?? 0.7,
        alternates: {
          languages: {
            en: `${SITE_CONFIG.url}/en${path}`,
            ar: `${SITE_CONFIG.url}/ar${path}`,
            "x-default": `${SITE_CONFIG.url}/en${path}`,
          },
        },
      });
    }
  }

  // Dynamic case study routes
  for (const study of caseStudies) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_CONFIG.url}/${locale}/work/${study.slug}`,
        lastModified: new Date(study.date),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            en: `${SITE_CONFIG.url}/en/work/${study.slug}`,
            ar: `${SITE_CONFIG.url}/ar/work/${study.slug}`,
            "x-default": `${SITE_CONFIG.url}/en/work/${study.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
