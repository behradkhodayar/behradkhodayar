// Single source of truth for the /dev-tools section listing and the sitemap.
// Each entry's `slug` is also the route-folder name under app/dev-tools/<slug>/.
// Dates are the original publication dates on the source platform.

import { type Post, byDateDesc } from "../lib/content";

export const posts: Post[] = [
  {
    slug: "nestcli-zsh",
    title: "Zsh plugin of Nest.js CLI tool",
    date: "2025-06-14",
    excerpt:
      "nestcli-zsh: a Zsh completion plugin for the Nest.js CLI with full coverage of commands, subcommands & options — announced on r/nestjs.",
    tags: ["Zsh", "NestJS", "CLI"],
  },
];

/** Newest-first posts for listing. */
export const postsByDate = byDateDesc(posts);
