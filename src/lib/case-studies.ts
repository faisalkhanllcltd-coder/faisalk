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
 * Retrieve all case study metadata sorted by date (newest first).
 */
export async function getAllCaseStudies(): Promise<CaseStudyMetadata[]> {
  try {
    const files = await fs.readdir(CASE_STUDIES_DIR);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

    const caseStudies = await Promise.all(
      mdxFiles.map(async (fileName) => {
        const filePath = path.join(CASE_STUDIES_DIR, fileName);
        const fileContent = await fs.readFile(filePath, "utf8");
        const { data } = matter(fileContent);

        return {
          title: data.title ?? "",
          slug: data.slug ?? fileName.replace(/\.mdx?$/, ""),
          client: data.client ?? "",
          role: data.role ?? "",
          timeline: data.timeline ?? "",
          date: data.date ?? "",
          summary: data.summary ?? "",
          metrics: data.metrics ?? [],
          tags: data.tags ?? [],
          featured: Boolean(data.featured),
        } as CaseStudyMetadata;
      })
    );

    // Sort newest first
    return caseStudies.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error reading case studies directory:", error);
    return [];
  }
}

/**
 * Retrieve a single case study by slug, including raw MDX content.
 */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
    let fileContent: string;
    try {
      fileContent = await fs.readFile(filePath, "utf8");
    } catch {
      // Fallback to .md if .mdx doesn't exist
      const fallbackPath = path.join(CASE_STUDIES_DIR, `${slug}.md`);
      fileContent = await fs.readFile(fallbackPath, "utf8");
    }

    const { data, content } = matter(fileContent);

    const metadata: CaseStudyMetadata = {
      title: data.title ?? "",
      slug: data.slug ?? slug,
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

/**
 * Get all slugs for static generation.
 */
export async function getAllCaseStudySlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(CASE_STUDIES_DIR);
    return files
      .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
      .map((file) => file.replace(/\.mdx?$/, ""));
  } catch {
    return [];
  }
}
