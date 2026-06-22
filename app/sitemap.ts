import type { MetadataRoute } from "next";
import { posts, projects } from "./ai/content";

export const dynamic = "force-static";

const SITE_URL = "https://behrad.khodayar.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const aiEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/ai/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/ai/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: `${SITE_URL}/ai/${project.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...aiEntries,
  ];
}
