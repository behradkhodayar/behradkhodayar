import type { Metadata } from "next";
import Link from "next/link";
import { postsByDate, projects } from "./content";

export const metadata: Metadata = {
  title: "AI",
  description:
    "Writing and interactive projects by Behrad Khodayar on AI, LLMs, and agentic systems.",
  alternates: { canonical: "https://behrad.khodayar.me/ai/" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AiIndex() {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-24 md:pt-28">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">AI</h1>
        <p className="mt-3 max-w-2xl text-base opacity-70">
          Notes and interactive projects on LLMs, agents, and the stack that runs
          them.
        </p>
      </header>

      <section aria-labelledby="writing-heading" className="mb-16">
        <h2
          id="writing-heading"
          className="mb-5 font-mono text-sm uppercase tracking-widest opacity-50"
        >
          Writing
        </h2>
        <ul className="flex flex-col gap-6">
          {postsByDate.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/ai/${post.slug}`}
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

      {projects.length > 0 && (
        <section aria-labelledby="projects-heading">
          <h2
            id="projects-heading"
            className="mb-5 font-mono text-sm uppercase tracking-widest opacity-50"
          >
            Projects
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/ai/${project.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-[var(--foreground)]/10 p-5 transition-colors hover:border-[var(--foreground)]/30"
                >
                  <h3 className="text-lg font-medium group-hover:underline">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm opacity-70">
                    {project.description}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
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
      )}
    </main>
  );
}
