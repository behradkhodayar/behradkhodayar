// Single source of truth for the /blockchain section listing and the sitemap.
// Each entry's `slug` is also the route-folder name under app/blockchain/<slug>/.
// Dates are the original publication dates on the source platform. The 2018
// posts were published in Farsi on blockfarsi.com and are translated to English
// here (originals linked from each post via the Wayback Machine).

import { type Post, byDateDesc } from "../lib/content";

export const posts: Post[] = [
];

/** Newest-first posts for listing. */
export const postsByDate = byDateDesc(posts);
