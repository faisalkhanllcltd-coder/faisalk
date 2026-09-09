export const projectTypes = [
  "full-stack",
  "seo-cro",
  "headless",
  "full-time",
  "advisory",
] as const;

export type ProjectType = (typeof projectTypes)[number];

export const projectTypeLabels: Record<ProjectType, string> = {
  "full-stack": "Full-Stack Web Development",
  "seo-cro": "Technical SEO & CRO Audit",
  headless: "Headless Commerce Architecture",
  "full-time": "Full-Time Engineering Role",
  advisory: "Consulting & Advisory",
};

export interface ContactFormState {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  formError?: string;
  submittedValues?: {
    name?: string;
    email?: string;
    projectType?: string;
    message?: string;
  };
}
