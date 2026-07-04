import Link from "next/link";
import { type Post, byDateDesc } from "../lib/content";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Listing page shared by the writing-only sections (/blockchain, /chess,
// /dev-tools). The /ai section keeps its own page since it also lists projects.
export default function SectionIndex({
  title,
  description,
  basePath,
  posts,
}: {
  title: string;
  description: string;
  basePath: string;
  posts: Post[];
}) {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-24 md:pt-28">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base opacity-70">{description}</p>
      </header>

      <section aria-labelledby="writing-heading">
        <h2
          id="writing-heading"
          className="mb-5 font-mono text-sm uppercase tracking-widest opacity-50"
        >
          Writing
        </h2>
        <ul className="flex flex-col gap-6">
          {byDateDesc(posts).map((post) => (
            <li key={post.slug}>
              <Link
                href={`${basePath}/${post.slug}`}
                className="group block rounded-xl border border-[var(--foreground)]/10 p-5 transition-colors hover:border-[var(--foreground)]/30"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-medium group-hover:underline">
                    {post.title}
                  </h3>
                  <time
                    dateTime={post.date}
                    className="shrink-0 font-mono text-xs opacity-50"
                  >
                    {formatDate(post.date)}
                  </time>
                </div>
                <p className="mt-2 text-sm opacity-70">{post.excerpt}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-[var(--foreground)]/15 px-2 py-0.5 font-mono text-[11px] opacity-60"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
