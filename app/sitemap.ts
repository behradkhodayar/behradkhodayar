import type { MetadataRoute } from "next";
import { posts as aiPosts, projects } from "./ai/content";
import { posts as blockchainPosts } from "./blockchain/content";
import { posts as chessPosts } from "./chess/content";
import { posts as devToolsPosts } from "./dev-tools/content";
import type { Post } from "./lib/content";

export const dynamic = "force-static";

const SITE_URL = "https://behrad.khodayar.me";

/** Publish date of the newest post — the last time the listing actually changed. */
function newestDate(posts: Post[]): Date {
  return new Date(
    posts.reduce((max, post) => (post.date > max ? post.date : max), posts[0].date),
  );
}

function sectionEntries(basePath: string, posts: Post[]): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}${basePath}/`,
      lastModified: newestDate(posts),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}${basePath}/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = [aiPosts, blockchainPosts, chessPosts, devToolsPosts];

  return [
    {
      url: SITE_URL,
      lastModified: newestDate(sections.flat()),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...sectionEntries("/ai", aiPosts),
    // Projects carry no publish date, so their entries omit lastModified
    // rather than report a value that changes on every build.
    ...projects.map((project) => ({
      url: `${SITE_URL}/ai/${project.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...sectionEntries("/blockchain", blockchainPosts),
    ...sectionEntries("/chess", chessPosts),
    ...sectionEntries("/dev-tools", devToolsPosts),
  ];
}
