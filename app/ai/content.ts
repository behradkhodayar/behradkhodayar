// Single source of truth for the /ai section listing and the sitemap.
// Each entry's `slug` is also the route-folder name under app/ai/<slug>/.
// Keep this in sync when adding a post (page.mdx) or project (page.tsx).

export type Post = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  excerpt: string;
  tags: string[];
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "classifiers-in-agent-harnesses",
    title: "Classifiers in Harnesses",
    date: "2026-07-04",
    excerpt:
      "A field guide to the classifiers wrapped around modern LLMs — security & jailbreak screens, prompt-injection probes, tool-risk & authorization gates, and the probabilistic classifier in front of Anthropic's Fable model.",
    tags: ["Classifiers", "Harnesses", "AI Safety"],
  },
];

export const projects: Project[] = [
  {
    slug: "agentic-coding-stack-aio",
    title: "Agentic Coding Stack — All-in-One",
    description:
      "An interactive ontology of the agentic coding stack: nine layers, the request lifecycle, cross-cutting concerns, and build-time provenance — explorable across four axes.",
    tags: ["Taxonomy", "Agents", "Interactive"],
  },
];

/** Newest-first posts for listing. */
export const postsByDate = [...posts].sort((a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
);
