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
    slug: "why-mcp-matters",
    title: "Why MCP Matters",
    date: "2026-06-22",
    excerpt:
      "A field note on the Model Context Protocol — what it standardizes, why it changes how agents reach the world, and where it still bites.",
    tags: ["MCP", "Agents", "LLMs"],
  },
];

export const projects: Project[] = [
  // The agentic-coding-stack-aio project route lands in a follow-up PR; its
  // entry is added here at the same time so the listing never points at a 404.
];

/** Newest-first posts for listing. */
export const postsByDate = [...posts].sort((a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
);
