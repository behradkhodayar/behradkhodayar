// Single source of truth for the /blockchain section listing and the sitemap.
// Each entry's `slug` is also the route-folder name under app/blockchain/<slug>/.
// Dates are the original publication dates on the source platform. The 2018
// posts were published in Farsi on blockfarsi.com and are translated to English
// here (originals linked from each post via the Wayback Machine).

import { type Post, byDateDesc } from "../lib/content";

export const posts: Post[] = [
  {
    slug: "demystifying-account-abstraction",
    title: "Demystifying Account Abstraction",
    date: "2024-06-05",
    excerpt:
      "A brief covering of the approaches to Account Abstraction on Ethereum — why AA at all, its history since 2016, and the notable proposals from EIP-2938 & ERC-4337 to EIP-7702 & ERC-7579.",
    tags: ["Ethereum", "Account Abstraction", "Web3"],
  },
  {
    slug: "bitcoin-mining",
    title: "Bitcoin Mining",
    date: "2018-12-06",
    excerpt:
      "What mining actually is, how blocks & hashes verify transactions, why ASICs won, and how to pick mining hardware. Translated from my Farsi outlet, بلاک فارسی (BlockFarsi).",
    tags: ["Bitcoin", "Mining", "BlockFarsi"],
  },
  {
    slug: "what-is-bitcoin",
    title: "What is Bitcoin?",
    date: "2018-11-17",
    excerpt:
      "bitcoin-the-currency vs Bitcoin-the-protocol, and how a bankless money differs from fiat. Translated from my Farsi outlet, بلاک فارسی (BlockFarsi).",
    tags: ["Bitcoin", "Tutorial", "BlockFarsi"],
  },
  {
    slug: "what-is-web3",
    title: "What is Web3?",
    date: "2018-11-12",
    excerpt:
      "The decentralized web as the next generation of the internet — killing the server, data democracy, and the Web3 stack. Translated from my Farsi outlet, بلاک فارسی (BlockFarsi).",
    tags: ["Web3", "Tutorial", "BlockFarsi"],
  },
  {
    slug: "did-bitcoin-sanction-iran",
    title: "Did Bitcoin Sanction Iran?!",
    date: "2018-11-10",
    excerpt:
      "Separating fact from headline around US sanctions, seized bitcoins and exchange geo-blocks — why 'Bitcoin sanctioned Iran' is a category error. Translated from BlockFarsi.",
    tags: ["Bitcoin", "Regulation", "BlockFarsi"],
  },
  {
    slug: "blockchain-crypto-glossary",
    title: "Blockchain & Cryptocurrency Glossary",
    date: "2018-11-10",
    excerpt:
      "The blockchain & crypto glossary I maintained on BlockFarsi — the entries that survived in the Wayback Machine, translated to English.",
    tags: ["Glossary", "BlockFarsi"],
  },
  {
    slug: "bitcoin-global-warming",
    title: "Bitcoin Adoption Could Push Global Warming Past the 2°C Threshold",
    date: "2018-10-31",
    excerpt:
      "Covering the Nature Climate Change study on Bitcoin's carbon footprint — projections, mining economics, and proposed fixes. Translated from BlockFarsi.",
    tags: ["Bitcoin", "Energy", "BlockFarsi"],
  },
  {
    slug: "were-not-as-rich-as-you-think",
    title: "We're Not as Rich as You Think!",
    date: "2018-10-28",
    excerpt:
      "Why Bitcoin early birds mostly aren't the millionaires people imagine — my Farsi translation of Gavin Andresen's piece, rendered back into English.",
    tags: ["Bitcoin", "Translation", "BlockFarsi"],
  },
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
