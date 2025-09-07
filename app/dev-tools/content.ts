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
  {
    slug: "gpu-dev-env-cold-starts",
    title: "How to Avoid Cold Starts in Rental GPU Dev Env [Hybrid Volumes Guide]",
    date: "2025-09-07",
    excerpt:
      "A pragmatic, provider-agnostic architecture for short cold-starts on rented GPUs — pre-baked images, hybrid volumes, S3-canonical state & GitHub Actions automation, with Runpod.io & Vast.ai as concrete examples.",
    tags: ["GPU", "Infra", "Automation"],
  },
];

/** Newest-first posts for listing. */
export const postsByDate = byDateDesc(posts);
