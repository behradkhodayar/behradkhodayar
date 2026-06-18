// Single source of truth for the /chess section listing and the sitemap.
// Each entry's `slug` is also the route-folder name under app/chess/<slug>/.
// Dates are the original publication dates on the source platform.

import { type Post, byDateDesc } from "../lib/content";

export const posts: Post[] = [
  {
    slug: "chexx-engines-transforming-pieces",
    title: "How would engines handle a chess variant where pieces transform after move?",
    date: "2026-06-18",
    excerpt:
      "The engine-design questions behind Chexx — my chess variant where every Major/minor move transmutes the piece: volatile material evaluation, unreliable piece-square tables, and alpha-beta vs MCTS.",
    tags: ["Chexx", "Chess Engines", "Game Design"],
  },
];

/** Newest-first posts for listing. */
export const postsByDate = byDateDesc(posts);
