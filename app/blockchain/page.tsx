import type { Metadata } from "next";
import SectionIndex from "../components/SectionIndex";
import { posts } from "./content";

export const metadata: Metadata = {
  title: "Blockchain",
  description:
    "Writing by Behrad Khodayar on blockchain — Ethereum, Account Abstraction, Bitcoin, and the archive of بلاک فارسی (BlockFarsi).",
  alternates: { canonical: "https://behrad.khodayar.me/blockchain/" },
};

export default function BlockchainIndex() {
  return (
    <SectionIndex
      title="Blockchain"
      description="Notes on Ethereum, Account Abstraction & Bitcoin — plus the recovered archive of بلاک فارسی (BlockFarsi), the Farsi blockchain outlet I ran in 2018, translated to English."
      basePath="/blockchain"
      posts={posts}
    />
  );
}
