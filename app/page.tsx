import type { Viewport } from "next";
import { type FeedEntry } from "./lib/content";
import { posts as aiPosts, projects } from "./ai/content";
import { posts as blockchainPosts } from "./blockchain/content";
import { posts as chessPosts } from "./chess/content";
import { posts as devToolsPosts } from "./dev-tools/content";
import PhosphorHome from "./components/PhosphorHome";

// The homepage feed: every post and project across sections, newest first.
// Sections keep their own listings; this page is the merged chronology.
function buildFeed(): FeedEntry[] {
  const postEntries = (
    [
      ["ai", aiPosts],
      ["blockchain", blockchainPosts],
      ["chess", chessPosts],
      ["dev-tools", devToolsPosts],
    ] as const
  ).flatMap(([section, posts]) =>
    posts.map((post) => ({
      href: `/${section}/${post.slug}`,
      title: post.title,
      date: post.date,
      section,
      kind: "post" as const,
      excerpt: post.excerpt,
      tags: post.tags,
    })),
  );

  const projectEntries = projects.map((project) => ({
    href: `/ai/${project.slug}`,
    title: project.title,
    date: project.date,
    section: "ai",
    kind: "project" as const,
    excerpt: project.description,
    tags: project.tags,
  }));

  return [...postEntries, ...projectEntries].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
  );
}

// The homepage is a phosphor CRT in both color schemes, so its browser
// chrome color is fixed dark regardless of the layout's scheme-aware pair.
export const viewport: Viewport = {
  themeColor: "#050806",
};

export default function Home() {
  return <PhosphorHome entries={buildFeed()} />;
}
