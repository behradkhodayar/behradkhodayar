// Single source of truth for the /dev-tools section listing and the sitemap.
// Each entry's `slug` is also the route-folder name under app/dev-tools/<slug>/.
// Dates are the original publication dates on the source platform.

import { type Post, byDateDesc } from "../lib/content";

export const posts: Post[] = [
];

/** Newest-first posts for listing. */
export const postsByDate = byDateDesc(posts);
