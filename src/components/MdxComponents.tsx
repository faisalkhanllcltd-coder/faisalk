import type { ComponentPropsWithoutRef } from "react";

export function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-center dark:border-gray-800 dark:bg-gray-900">
      <div className="text-3xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">{value}</div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}

export function Callout({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "success" | "warning" }) {
  const styles = {
    info: "border-blue-500 bg-blue-50 text-blue-950 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-400",
    success: "border-green-500 bg-green-50 text-green-950 dark:bg-green-950/60 dark:text-green-200 dark:border-green-400",
    warning: "border-amber-500 bg-amber-50 text-amber-950 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-400",
  };

  return (
    <aside className={`my-6 rounded-lg border-s-4 p-4 text-sm leading-relaxed ${styles[type]}`}>
      {children}
    </aside>
  );
}

export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mt-10 mb-4 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl dark:text-white" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 mb-4 border-b border-gray-200 pb-2 text-2xl font-bold tracking-tight text-gray-950 dark:border-gray-800 dark:text-white" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-6 mb-3 text-xl font-semibold tracking-tight text-gray-950 dark:text-white" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="my-4 text-base leading-relaxed text-gray-700 dark:text-gray-300" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-4 ms-6 list-disc space-y-2 text-gray-700 dark:text-gray-300" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-4 ms-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-6 border-s-4 border-gray-300 ps-4 italic text-gray-700 dark:border-gray-700 dark:text-gray-300" {...props} />
  ),
  hr: () => <hr className="my-8 border-gray-200 dark:border-gray-800" />,
  MetricCard,
  Callout,
};
