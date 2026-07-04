// Single source of truth for the /chess section listing and the sitemap.
// Each entry's `slug` is also the route-folder name under app/chess/<slug>/.
// Dates are the original publication dates on the source platform.

import { type Post, byDateDesc } from "../lib/content";

export const posts: Post[] = [
];

/** Newest-first posts for listing. */
export const postsByDate = byDateDesc(posts);
