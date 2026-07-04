import type { Metadata } from "next";
import SectionIndex from "../components/SectionIndex";
import { posts } from "./content";

export const metadata: Metadata = {
  title: "Dev Tools",
  description:
    "Writing by Behrad Khodayar on developer tooling — CLIs, shells, and the small tools that keep the loop tight.",
  alternates: { canonical: "https://behrad.khodayar.me/dev-tools/" },
};

export default function DevToolsIndex() {
  return (
    <SectionIndex
      title="Dev Tools"
      description="CLIs, shells & the small tools that keep the loop tight."
      basePath="/dev-tools"
      posts={posts}
    />
  );
}
