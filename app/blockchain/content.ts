// Single source of truth for the /blockchain section listing and the sitemap.
// Each entry's `slug` is also the route-folder name under app/blockchain/<slug>/.
// Dates are the original publication dates on the source platform. The 2018
// posts were published in Farsi on blockfarsi.com and are translated to English
// here (originals linked from each post via the Wayback Machine).

import { type Post, byDateDesc } from "../lib/content";

export const posts: Post[] = [
  {
    slug: "ibm-omfif-cbdc-study",
    title: "IBM Study: Central Banks Should Issue Digital Currencies",
    date: "2018-10-28",
    excerpt:
      "The IBM/OMFIF study: most surveyed financial institutions think central banks should develop CBDCs — plus the skeptics at HSBC & the BOJ. Translated from BlockFarsi.",
    tags: ["CBDC", "News", "BlockFarsi"],
  },
  {
    slug: "oracle-blockchain-cloud-service",
    title: "Oracle Releases Its Blockchain SaaS Suite",
    date: "2018-10-27",
    excerpt:
      "Oracle ships its Blockchain Applications Cloud — enterprise blockchain SaaS for supply chains, built on Hyperledger Fabric. Translated from BlockFarsi.",
    tags: ["Enterprise", "News", "BlockFarsi"],
  },
];

/** Newest-first posts for listing. */
export const postsByDate = byDateDesc(posts);
