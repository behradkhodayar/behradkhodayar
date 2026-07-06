// Single source of truth for the /ai section listing and the sitemap.
// Each entry's `slug` is also the route-folder name under app/ai/<slug>/.
// Keep this in sync when adding a post (page.mdx) or project (page.tsx).

import { type Post, byDateDesc } from "../lib/content";

export type { Post };

export type Project = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD) — the date the project first shipped on the site. */
  date: string;
  description: string;
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "introducing-claude-code-py-ts-pg",
    title: "Introducing claude-code-py-ts-pg: a full-stack template w/ Claude built in",
    date: "2026-07-06",
    excerpt:
      "Why & what of my new GitHub template (Python/FastAPI + TypeScript/React + Postgres) w/ a committed Claude Code harness: rules, skills, subagents & least-privilege permissions, treated as production infrastructure.",
    tags: ["Claude Code", "Template", "Full-Stack"],
  },
  {
    slug: "classifiers-in-agent-harnesses",
    title: "Classifiers in Harnesses",
    date: "2026-07-04",
    excerpt:
      "A field guide to the classifiers wrapped around modern LLMs — security & jailbreak screens, prompt-injection probes, tool-risk & authorization gates, and the probabilistic classifier in front of Anthropic's Fable model.",
    tags: ["Classifiers", "Harnesses", "AI Safety"],
  },
  {
    slug: "past-three-months-in-ai",
    title: "The Past Three Months in AI (March–May 2026)",
    date: "2026-05-29",
    excerpt:
      "A post-blackout recap of the AI frontier: the model wave, the architecture pivot away from raw scale, agentic coding's convergence, the MCP+A2A protocol stack & unprecedented capital — translated from my Farsi original.",
    tags: ["Frontier Models", "Agents", "Translation"],
  },
  {
    slug: "how-i-actually-use-ai-every-day",
    title: "How I Actually Use AI Every Day as a Software Engineer",
    date: "2026-05-10",
    excerpt:
      "My field-tested setup for AI-assisted engineering: context management, skills, sub-agents, MCP, hooks & plan mode, spec-first development, dynamic workflows — and why verification is the skill that actually 10x's you.",
    tags: ["Claude Code", "Agents", "Workflow"],
  },
];

export const projects: Project[] = [
  {
    slug: "agentic-coding-stack-aio",
    title: "Agentic Coding Stack — All-in-One",
    date: "2026-06-22",
    description:
      "An interactive ontology of the agentic coding stack: nine layers, the request lifecycle, cross-cutting concerns, and build-time provenance — explorable across four axes.",
    tags: ["Taxonomy", "Agents", "Interactive"],
  },
];

/** Newest-first posts for listing. */
export const postsByDate = byDateDesc(posts);
