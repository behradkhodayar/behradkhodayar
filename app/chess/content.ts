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
  {
    slug: "introducing-chexx",
    title: "Introducing CheXX: chess w/ transmuting pieces",
    date: "2026-06-17",
    excerpt:
      "Why & how I built CheXX — a chess variant where Major/Minor pieces transmute on landing, value-capped to keep both armies balanced, shipped as a 3D browser game.",
    tags: ["Chexx", "Game Design", "Three.js"],
  },
];

/** Newest-first posts for listing. */
export const postsByDate = byDateDesc(posts);
