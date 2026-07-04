import type { MetadataRoute } from "next";
import { posts as aiPosts, projects } from "./ai/content";
import { posts as blockchainPosts } from "./blockchain/content";
import { posts as chessPosts } from "./chess/content";
import { posts as devToolsPosts } from "./dev-tools/content";
import type { Post } from "./lib/content";

export const dynamic = "force-static";

const SITE_URL = "https://behrad.khodayar.me";

function sectionEntries(
  basePath: string,
  posts: Post[],
  now: Date,
): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}${basePath}/`,
      lastModified: now,
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
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...sectionEntries("/ai", aiPosts, now),
    ...projects.map((project) => ({
      url: `${SITE_URL}/ai/${project.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...sectionEntries("/blockchain", blockchainPosts, now),
    ...sectionEntries("/chess", chessPosts, now),
    ...sectionEntries("/dev-tools", devToolsPosts, now),
  ];
}
