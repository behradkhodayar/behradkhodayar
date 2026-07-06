// Shared shapes for the writing sections (/ai, /blockchain, /chess, /dev-tools).
// Each section keeps its own content.ts listing; this module only holds the
// common types and helpers so they don't drift apart.

export type Post = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD) — the date the piece was originally published. */
  date: string;
  excerpt: string;
  tags: string[];
};

/** Newest-first copy of `posts` for listing. */
export function byDateDesc(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** One row of the homepage feed: every post and project across sections. */
export type FeedEntry = {
  /** Route path, e.g. "/ai/introducing-chexx". */
  href: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** Section label shown in the row, e.g. "ai", "blockchain". */
  section: string;
  /** Posts read like files, projects like executables — mirrored in the UI. */
  kind: "post" | "project";
  excerpt: string;
  tags: string[];
};
