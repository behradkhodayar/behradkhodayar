import type { Metadata } from "next";
import { type FeedEntry } from "./lib/content";
import { posts as aiPosts, projects } from "./ai/content";
import { posts as blockchainPosts } from "./blockchain/content";
import { posts as chessPosts } from "./chess/content";
import { posts as devToolsPosts } from "./dev-tools/content";
import PhosphorHome from "./components/PhosphorHome";
import {
  PERSON_DESCRIPTION,
  PERSON_IMAGE,
  PERSON_NAME,
  SITE_URL,
  personJsonLd,
} from "./lib/site";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/`,
    firstName: "Behrad",
    lastName: "Khodayar",
    title: `${PERSON_NAME} — Software Engineer`,
    description: PERSON_DESCRIPTION,
    images: [{ url: PERSON_IMAGE, alt: `Photo of ${PERSON_NAME}` }],
  },
};

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
      featured: post.featured,
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <PhosphorHome entries={buildFeed()} />
    </>
  );
}
