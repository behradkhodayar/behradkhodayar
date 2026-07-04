import Link from "next/link";

type PostMeta = {
  title: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  tags?: string[];
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Article shell shared by every MDX post. The MDX body is rendered inside the
// `prose` wrapper (@tailwindcss/typography).
export default function PostLayout({
  meta,
  backHref = "/ai",
  backLabel = "AI",
  children,
}: {
  meta: PostMeta;
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-2xl px-5 pb-24 pt-24 md:pt-28">
      <Link
        href={backHref}
        className="font-mono text-sm opacity-60 transition-opacity hover:opacity-100"
      >
        ← {backLabel}
      </Link>

      <header className="mb-10 mt-6">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {meta.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <time dateTime={meta.date} className="font-mono text-sm opacity-50">
            {formatDate(meta.date)}
          </time>
          {meta.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--foreground)]/15 px-2 py-0.5 font-mono text-[11px] opacity-60"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-pre:p-0 prose-pre:bg-transparent">
        {children}
      </article>
    </main>
  );
}
