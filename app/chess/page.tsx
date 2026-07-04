import type { Metadata } from "next";
import SectionIndex from "../components/SectionIndex";
import { posts } from "./content";

export const metadata: Metadata = {
  title: "Chess",
  description:
    "Writing by Behrad Khodayar on chess & chess programming — including Chexx, a chess variant where every move transmutes your pieces.",
  alternates: { canonical: "https://behrad.khodayar.me/chess/" },
};

export default function ChessIndex() {
  return (
    <SectionIndex
      title="Chess"
      description="Notes around Chexx — my chess variant where every move transmutes your pieces — and chess programming in general."
      basePath="/chess"
      posts={posts}
    />
  );
}
