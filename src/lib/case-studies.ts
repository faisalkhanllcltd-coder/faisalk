import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudyMetadata {
  title: string;
  slug: string;
  client: string;
  role: string;
  timeline: string;
  date: string;
  summary: string;
  metrics: CaseStudyMetric[];
  tags: string[];
  featured?: boolean;
}

export interface CaseStudy {
  metadata: CaseStudyMetadata;
  content: string;
}

const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "case-studies");

/**
 * Get all unique slugs for static generation.
 */
export async function getAllCaseStudySlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(CASE_STUDIES_DIR);
    const slugs = new Set<string>();

    for (const file of files) {
      if (file.endsWith(".mdx") || file.endsWith(".md")) {
        // Strip .ar.mdx or .mdx to get the canonical slug
        const baseSlug = file.replace(/\.(ar\.)?mdx?$/, "");
        slugs.add(baseSlug);
      }
    }

    return Array.from(slugs);
  } catch {
    return [];
  }
}

/**
 * Retrieve all case study metadata for a given locale, sorted by date (newest first).
 */
export async function getAllCaseStudies(locale: string = "en"): Promise<CaseStudyMetadata[]> {
  try {
    const slugs = await getAllCaseStudySlugs();

    const caseStudies = await Promise.all(
      slugs.map(async (slug) => {
        const study = await getCaseStudyBySlug(slug, locale);
        return study ? study.metadata : null;
      })
    );

    const validStudies = caseStudies.filter((s): s is CaseStudyMetadata => s !== null);

    // Sort newest first
    return validStudies.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error reading case studies directory:", error);
    return [];
  }
}

/**
 * Retrieve a single case study by slug and locale, including raw MDX content.
 */
export async function getCaseStudyBySlug(slug: string, locale: string = "en"): Promise<CaseStudy | null> {
  try {
    let filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);

    // If requested locale is non-English, check for localized file first
    if (locale && locale !== "en") {
      const localizedPath = path.join(CASE_STUDIES_DIR, `${slug}.${locale}.mdx`);
      try {
        await fs.access(localizedPath);
        filePath = localizedPath;
      } catch {
        // Fall back to default English file
      }
    }

    let fileContent: string;
    try {
      fileContent = await fs.readFile(filePath, "utf8");
    } catch {
      // Fallback to .md
      const fallbackPath = path.join(CASE_STUDIES_DIR, `${slug}.md`);
      fileContent = await fs.readFile(fallbackPath, "utf8");
    }

    const { data, content } = matter(fileContent);

    const metadata: CaseStudyMetadata = {
      title: data.title ?? "",
      slug: slug,
      client: data.client ?? "",
      role: data.role ?? "",
      timeline: data.timeline ?? "",
      date: data.date ?? "",
      summary: data.summary ?? "",
      metrics: data.metrics ?? [],
      tags: data.tags ?? [],
      featured: Boolean(data.featured),
    };

    return { metadata, content };
  } catch {
    return null;
  }
}
